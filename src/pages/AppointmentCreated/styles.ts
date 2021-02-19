import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;

`;

export const Content = styled.View`
  align-items: center;
  margin: auto 0;
`;

export const TitleText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  color: #F4EDE8;
  margin-top: 40px;
  margin-bottom: 16px;
  max-width: 270px;


`;

export const AppointmentDescription = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  line-height: 24px;
  color: #999591;
  max-width: 270px;
  text-align: center;
  margin-bottom: 40px;

`;

export const Button = styled(RectButton)`
  background: #ff9000;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;

`;

export const ButtonText = styled.Text`
   font-family: 'RobotoSlab-Medium';
   font-weight: bold;
   font-size: 16px;
   color: #312e38;
`;
