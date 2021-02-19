import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  FlatListName,
  ProvidersContainer,
  ProviderAvatar,
  ProvidersContent,
  ProviderName,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
} from "./styles";

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigationToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate]);

  const signout = useCallback(() => {
    signOut();
  }, [signOut]);

  useEffect(() => {
    api.get("/providers").then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', {providerId});
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigationToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={<FlatListName>Cabeleireiros</FlatListName>}
        renderItem={({ item }) => (
          <ProvidersContainer onPress={() => navigateToCreateAppointment(item.id)}>
            <ProvidersContent>
              <ProviderAvatar source={{ uri: item.avatar_url }} />
              <ProviderInfo>
                <ProviderName>{item.name}</ProviderName>
                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                </ProviderMeta>
                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProvidersContent>
          </ProvidersContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
