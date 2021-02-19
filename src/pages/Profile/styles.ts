import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;


export const Header = styled.View`
  margin-top: 24px;
  padding: 0 24px;
  
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  color: #f4ede8;
`;



export const  UserAvatar = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  align-self: center;
`;

export const UserAvatarImage = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const UserAvatarButton = styled(RectButton)`
  background: #ff9000;
  width: 50px;
  height: 50px; 

  align-items: center;
  justify-content: center;
  border-radius: 25px;
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

export const Section = styled.View`
  padding: 0 40px;
`;

export const HeaderReturnToDashboard = styled(RectButton)`

`;


export const HeaderLogOut = styled(RectButton)`

`;

