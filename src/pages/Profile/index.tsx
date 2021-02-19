import React, { useCallback, useRef } from "react";
import Icon from "react-native-vector-icons/Feather";
import ImagePicker from 'react-native-image-picker';
import {
  Container,
  Header,
  HeaderTitle,
  Section,
  UserAvatar,
  UserAvatarImage,
  UserAvatarButton,
  HeaderReturnToDashboard,
  HeaderLogOut,
} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/auth";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import { useNavigation } from "@react-navigation/native";
import { Alert, TextInput } from "react-native";

import * as Yup from 'yup';
import api from "../../services/api";
import getValidationErrors from "../../utils/getValidationErrors";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, signOut, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const {navigate, goBack} = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleLogOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const handleBackToDashboard = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  const handleSubmmitForm = useCallback(async(data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome Obrigatório"),
        email: Yup.string()
          .required("E-mail Obrigatório")
          .email("Digite um E-mail Obrigatório"),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val: any) => !!val.length,
          then: Yup.string().required("Campo obrigatório"),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when("old_password", {
            is: (val: any) => !!val.length,
            then: Yup.string().required("Campo obrigatório"),
            otherwise: Yup.string(),
          })
          .oneOf(
            [Yup.ref("password"), undefined],
            "A Confirmação de senha está incorreta"
          ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {name, email, old_password, password, password_confirmation} = data;

        if(!old_password && password && password_confirmation) {
          throw new Error();
        }

        const formData = Object.assign({
          name,
          email
        }, old_password ? {
          old_password,
          password,
          password_confirmation
        } : {});

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        Alert.alert(
          'Perfil atualizado com sucesso!'
        );

        goBack();

    } catch (err) {
        if(err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente'
        );
    }
  }, [goBack, updateUser]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker({
      title: 'Selecione um avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'
    }, response => {
      if (response.didCancel) {
        return;
      }

      if(response.error) {
        Alert.alert('Erro ao atualizar seu avatar.');
        return;
      }

      const source = { uri: response.uri};

      const data = new FormData();
      
      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri
      });

      api.patch('/users/avatar', data).then(apiResponse => {
        updateUser(apiResponse.data);
      });

    })
  }, [updateUser, user.id]);

  return (
    <Container>
      <Header>
        <HeaderReturnToDashboard onPress={handleBackToDashboard}>
        <Icon name="arrow-left" color="#999591" size={24} />
        </HeaderReturnToDashboard>
        <HeaderTitle>Meu Perfil</HeaderTitle>
        <HeaderLogOut onPress={handleLogOut}>
        <Icon name="power" color="#999591" size={24} />
        </HeaderLogOut>
      </Header>
      <UserAvatar>
        <UserAvatarImage source={{uri: user.avatar_url}}/>
        <UserAvatarButton onPress={handleUpdateAvatar}>
          <Icon name="camera" color="#312e38" size={20}/>
        </UserAvatarButton>
      </UserAvatar>
      <Section>
        <Form initialData={user} ref={formRef} onSubmit={handleSubmmitForm}>
        <Input
          autoCapitalize="words"
          name="name"
          icon="user"
          placeholder="Nome"
          returnKeyType="next"
          onSubmitEditing={() => {
            emailInputRef.current?.focus()
           }}
        />
        <Input
           ref={emailInputRef}
           keyboardType="email-address"
           autoCorrect={false}
           autoCapitalize="none"
           name="email"
           icon="mail"
           placeholder="E-mail"
           returnKeyType="next"
           onSubmitEditing={() => {
            oldPasswordInputRef.current?.focus()
           }}
        />
        <Input
          ref={oldPasswordInputRef}
          name="old_password"
          icon="lock"
          placeholder="Senha atual"
          secureTextEntry
          textContentType="newPassword"
          returnKeyType="next"
          containerStyle={{marginTop: 16}}
          onSubmitEditing={() => {
            passwordInputRef.current?.focus()
          }}
        />
        <Input
          ref={passwordInputRef}
          secureTextEntry
          name="password"
          icon="lock"
          placeholder="Nova senha"
          textContentType="newPassword"
          returnKeyType="next"
          onSubmitEditing={() => {
            formRef.current?.submitForm()
          }}
        />
        <Input
           ref={confirmPasswordInputRef}
           secureTextEntry
           name="password_confirmation"
           icon="lock"
           placeholder="Confirmar senha"
           textContentType="newPassword"
           returnKeyType="send"
           onSubmitEditing={() => {
             confirmPasswordInputRef.current?.focus()
           }}
        />
        <Button onPress={() => formRef.current?.submitForm()}>
          Confirmar mudanças
        </Button>
        </Form>
      </Section>
    </Container>
  );
};

export default Profile;
