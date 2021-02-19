import styled from "styled-components/native";
import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlatList, RectButton } from "react-native-gesture-handler";
import { Provider } from "./index";

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background: #28262e;
  padding: ${Platform.OS === "ios" ? getStatusBarHeight() + 24 : 24}px 24px 24px
    24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderText = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: "RobotoSlab-Medium";
  margin-left: 80px;
`;

export const HeaderAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: 42px;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 80px;
  margin-top: 32px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  flex-direction: row;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${(props) => (props.selected === true ? "#ff9000" : "#3E3B47")};
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
  height: 48px;
  padding: 5px 12px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  font-family: "RobotoSlab-Medium";
  font-size: 16px;
  color: ${(props) => (props.selected === true ? "#232129" : "#F4EDE8")};
  margin-left: 8px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: "RobotoSlab-Medium";
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: "RobotoSlab-Medium";
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: "RobotoSlab-Regular";
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${props => props.selected ? '#ff9000' : '#3e3b47'};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => props.selected ? '#232129' : '#f4ede8' };
  font-family: "RobotoSlab-Regular";
  font-size: 16px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

