// import styled from 'styled-components/native';
import styled from '@emotion/native';


export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Header = styled.View`
  margin-bottom: 60px;
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 60px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #6C63FF;
  margin-right: 25%;
`;

export const Form = styled.View`
  flex: 1;
  gap: 16px;
`;

export const InputContainer = styled.View`
  gap: 8px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
`;

export const Input = styled.TextInput`
  background-color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
`;

export const Select = styled.TouchableOpacity`
  background-color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SelectText = styled.Text`
  font-size: 16px;
  color: #1a1a1a;
`;

export const Button = styled.TouchableOpacity`
  background-color: #6C63FF;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

export const Switch = styled.Switch(props => ({
  trackColor: { false: '#767577', true: '#6C63FF' },
  thumbColor: '#f4f3f4',
  ...props,
}));

// export const Switch = styled.Switch.attrs({
//   trackColor: { false: '#767577', true: '#6C63FF' },
//   thumbColor: '#f4f3f4',
// })``;

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 12px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  background-color: #FFFFFF;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  max-height: 70%;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1a1a1a;
`;

export const ServiceItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const ServiceIcon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  color: #1a1a1a;
`;

export const PeriodItem = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const PeriodText = styled.Text`
  font-size: 16px;
  color: #1a1a1a;
`;