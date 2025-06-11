import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #6C63FF;
`;

export const Header = styled.View`
  top: 50px;
  margin-bottom: 60px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #6C63FF;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const AddButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

export const SubscriptionList = styled.FlatList`
  flex: 1;
`;