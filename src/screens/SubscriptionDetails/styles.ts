// import styled from 'styled-components/native';
import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Header = styled.View`
  margin-bottom: 24px;
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1a;
`;

export const ServiceContainer = styled.View`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  align-items: center;
`;

export const ServiceIcon = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 16px;
`;

export const ServiceName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

export const StatusBadge = styled.View<{ active: boolean }>`
  background-color: ${(props: { active: boolean; }) => props.active ? '#E8FAE9' : '#FFE5E5'};
  padding: 8px 16px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
`;

export const StatusIndicator = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: { active: boolean; }) => props.active ? '#34C759' : '#FF3B30'};
  margin-right: 8px;
`;

export const StatusText = styled.Text<{ active: boolean }>`
  color: ${(props: { active: boolean; }) => props.active ? '#34C759' : '#FF3B30'};
  font-weight: 500;
`;

export const InfoSection = styled.View`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const InfoLabel = styled.Text`
  font-size: 16px;
  color: #666666;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
`;

export const EditButton = styled.TouchableOpacity`
  background-color: #6C63FF;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const EditButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

// export const Switch = styled.Switch.attrs({
//   trackColor: { false: '#767577', true: '#6C63FF' },
//   thumbColor: '#f4f3f4',
// })``;

export const Switch = styled.Switch(props => ({
  trackColor: { false: '#767577', true: '#6C63FF' },
  thumbColor: '#f4f3f4',
  ...props,
}));

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;