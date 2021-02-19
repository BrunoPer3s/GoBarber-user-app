import styled from 'styled-components/native';
import { Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View `
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? '140px' : '54px'};
`;

export const Title = styled.Text `
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  margin: 64px 0 24px;

`;

export const BacktoSignIn = styled.TouchableOpacity `
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-top-width: 1px;
  border-color: #232129;
  background: #312E38;
`;

export const BacktoSignInText = styled.Text `
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;


`;

export const Icon = styled(FeatherIcon) `
  margin-right: 16px;


`;