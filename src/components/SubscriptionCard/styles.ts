import styled from '@emotion/native';

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #1a1a1a;
`;

export const Card = styled.TouchableOpacity`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  elevation: 2;
`;

export const ServiceIcon = styled.Image`
  border: 1px;
  border-color: #E5E5EA;
  width: 60px;
  height: 60px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-right: 16px;
`;

export const SubscriptionInfo = styled.View`
  flex: 1;
`;

export const ServiceName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
`;

export const Price = styled.Text`
  font-size: 16px;
  color: #6C63FF;
  font-weight: bold;
  margin-top: 4px;
`;

export const Details = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-top: 4px;
`;

export const Period = styled.Text`
  font-size: 14px;
  color: #666666;
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const StatusIndicator = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: { active: boolean; }) => props.active ? '#34C759' : '#FF3B30'};
  position: absolute;
  top: 16px;
  right: 16px;
`;