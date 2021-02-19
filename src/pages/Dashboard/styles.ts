import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Platform } from "react-native";
import { Provider } from "./index";
import { FlatList, RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: ${Platform.OS === "ios" ? getStatusBarHeight() + 24 : 24}px 24px 24px
    24px;

  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: "RobotoSlab-Regular";
  line-height: 28px;
  margin-top: 22px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: "RobotoSlab-Medium";
`;

export const ProfileButton = styled.TouchableOpacity``;

export const FlatListName = styled.Text`
  color: #F4EDE8;
  font-family: "RobotoSlab-Medium";
  font-size: 25px;
  line-height: 33px;
  padding: 32px 24px 24px 24px;
`;


export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)``;

export const ProvidersContainer = styled(RectButton)`
 
  background: #3E3B47;
  border-radius: 10px;
  margin: 0px 24px 16px 24px;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;

`;

export const ProvidersContent = styled.View`
 flex-direction: row;
 padding: 19px 16px;
 `;

export const ProviderName = styled.Text`
  color:  #F4EDE8;
  font-size: 18px;
  line-height: 24px;
  font-family: "RobotoSlab-Regular";
  margin-bottom: 6px;
`;

export const ProviderInfo = styled.View`
  flex-direction: column;
  margin-left: 20px;


`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  margin-top: 6px;
  align-items: center;

`;

export const ProviderMetaText = styled.Text`
  color: #999591;
  font-size: 12px;
  line-height: 16px;
  font-family: "RobotoSlab-Regular";
  margin-left: 10px;
`;