import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Container,
  Header,
  HeaderContent,
  HeaderText,
  HeaderAvatar,
  BackButton,
  Content,
  ProvidersList,
  ProviderName,
  ProviderAvatar,
  ProviderContainer,
  ProvidersListContainer,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText
} from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { Alert, Platform } from "react-native";
import { format } from "date-fns";

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigateToDashboard = useCallback(() => {
    navigate("Dashboard");
  }, [navigate]);

  useEffect(() => {
    api.get("/providers").then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === "android") {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },[]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      console.log(selectedProvider);
      console.log(date);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', {date: date.getTime()});
    }
      catch (err) {
        console.log(err);
        Alert.alert(
          'Erro ao criar agendamento',
          'Ocorreu um erro ao criar o agendamento, tente novamente'
        )
      }
  }, [navigate, selectedDate, selectedProvider, selectedHour]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), "HH:00"),
          available,
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), "HH:00"),
          available,
        };
      });
  }, [availability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={navigateToDashboard}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>
          <HeaderText>Agendamento</HeaderText>
          <HeaderAvatar source={{ uri: user.avatar_url }} />
        </HeaderContent>
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item }) => (
              <ProviderContainer
                selected={selectedProvider === item.id}
                onPress={() => handleSelectProvider(item.id)}
              >
                <ProviderAvatar source={{ uri: item.avatar_url }} />
                <ProviderName selected={selectedProvider === item.id}>
                  {item.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>
        <Calendar>
          <Title>Escolha a data</Title>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra Data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              {...(Platform.OS === "ios" && { textColor: "#f4ede8" })}
              mode="date"
              display={Platform.OS === "android" ? "calendar" : "spinner"}
              onChange={handleDateChanged}
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ formattedHour, available, hour }) => (
                <Hour 
                enabled={available}
                selected={selectedHour === hour}
                onPress={() => handleSelectHour(hour)}
                available={available} 
                key={formattedHour}>
                  <HourText
                  selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({ formattedHour, available, hour }) => (
                <Hour 
                enabled={available}
                selected={selectedHour === hour}
                onPress={() => handleSelectHour(hour)}
                available={available} 
                key={formattedHour}>
                  <HourText
                  selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>
        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;