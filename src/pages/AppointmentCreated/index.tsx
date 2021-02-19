import React, { useCallback, useMemo, useState } from "react";
import {
  Container,
  Content,
  TitleText,
  AppointmentDescription,
  Button,
  ButtonText
} from "./styles";

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns/esm";
import  ptBR  from "date-fns/locale/pt-BR";

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const {reset} = useNavigation();
  const {params} = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{name: 'Dashboard'}],
      index: 0
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR }
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Content>
        <Icon name="check" color="#04D361" size={80}/>
        <TitleText>Agendamento concluído</TitleText>
        <AppointmentDescription>{formattedDate}</AppointmentDescription>
        <Button onPress={handleOkPressed}>
          <ButtonText>Ok</ButtonText>
        </Button>
      </Content>
    </Container>
  );
};

export default AppointmentCreated;
