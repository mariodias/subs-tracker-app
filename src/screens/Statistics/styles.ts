import styled from '@emotion/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Header = styled.View`
  margin-bottom: 40px;
  margin-top: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #6C63FF;
`;

export const ChartContainer = styled.View`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  align-items: center;
`;

export const ChartTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 16px;
  align-self: flex-start;
`;

export const StatCard = styled.View`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StatInfo = styled.View`
  flex: 1;
`;

export const StatLabel = styled.Text`
  font-size: 16px;
  color: #666666;
`;

export const StatValue = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1a1a1a;
  margin-top: 4px;
`;

export const StatIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f0f0;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

export const PeriodSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const PeriodButton = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${(props: { active: boolean }) => props.active ? '#6C63FF' : '#FFFFFF'};
  padding: 10px 16px;
  border-radius: 20px;
  flex: 1;
  margin: 0 4px;
  align-items: center;
`;

export const PeriodButtonText = styled.Text<{ active: boolean }>`
  color: ${(props: { active: boolean }) => props.active ? '#FFFFFF' : '#666666'};
  font-weight: ${(props: { active: boolean }) => props.active ? 'bold' : 'normal'};
`;

export const EmptyStateContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #666666;
  text-align: center;
  margin-top: 16px;
`;