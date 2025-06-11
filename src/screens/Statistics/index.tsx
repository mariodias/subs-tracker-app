import { useState, useCallback } from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { getAllSubscriptions } from '@storage/subscription/getAllSubscriptions';
import { SubscriptionStorageDTO } from '@storage/subscription/subscriptionStorageDTO';
import { formatCurrency } from '@util/apply-masks';

import {
  Container,
  Header,
  Title,
  ChartContainer,
  ChartTitle,
  StatCard,
  StatInfo,
  StatLabel,
  StatValue,
  StatIcon,
  PeriodSelector,
  PeriodButton,
  PeriodButtonText,
  EmptyStateContainer,
  EmptyStateText,
} from './styles';

type PeriodType = 'Mensal' | 'Anual' | 'Todos';

export function Statistics() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionStorageDTO[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('Todos');
  
  const navigation = useNavigation();

  function handleNavigateToHome() {
    navigation.navigate('home');
  }

  function handlePeriodChange(period: PeriodType) {
    setSelectedPeriod(period);
  }

  const filteredSubscriptions = subscriptions.filter(subscription => {
    if (selectedPeriod === 'Todos') return true;
    return subscription.period === selectedPeriod;
  });

  const activeSubscriptions = filteredSubscriptions.filter(sub => sub.active);
  const inactiveSubscriptions = filteredSubscriptions.filter(sub => !sub.active);
  
  const totalMonthlyExpense = activeSubscriptions.reduce((acc, subscription) => {
    const monthlyValue = subscription.period === 'Anual' 
      ? subscription.price / 12 
      : subscription.price;
    return acc + monthlyValue;
  }, 0);
  
  const totalAnnualExpense = totalMonthlyExpense * 12;
  
  const mostExpensiveSubscription = activeSubscriptions.length > 0 
    ? activeSubscriptions.reduce((prev, current) => 
        (prev.price > current.price) ? prev : current
      ) 
    : null;

  async function fetchSubscriptions() {
    try {
      const data = await getAllSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Erro ao carregar assinaturas:', error);
      Alert.alert('SubsTracker', 'Não foi possível carregar as estatísticas. Tente novamente mais tarde.');
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchSubscriptions();
    }, [])
  );

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Ionicons name="chevron-back-outline" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <Title>Estatísticas</Title>
        <Ionicons name="stats-chart" size={28} color="#6C63FF" />
      </Header>

      <PeriodSelector>
        <PeriodButton 
          active={selectedPeriod === 'Todos'} 
          onPress={() => handlePeriodChange('Todos')}
        >
          <PeriodButtonText active={selectedPeriod === 'Todos'}>Todos</PeriodButtonText>
        </PeriodButton>
        <PeriodButton 
          active={selectedPeriod === 'Mensal'} 
          onPress={() => handlePeriodChange('Mensal')}
        >
          <PeriodButtonText active={selectedPeriod === 'Mensal'}>Mensal</PeriodButtonText>
        </PeriodButton>
        <PeriodButton 
          active={selectedPeriod === 'Anual'} 
          onPress={() => handlePeriodChange('Anual')}
        >
          <PeriodButtonText active={selectedPeriod === 'Anual'}>Anual</PeriodButtonText>
        </PeriodButton>
      </PeriodSelector>

      {filteredSubscriptions.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ChartContainer>
            <ChartTitle>Resumo de Gastos - {selectedPeriod}</ChartTitle>
            
            <StatCard>
              <StatInfo>
                <StatLabel>Gasto Mensal</StatLabel>
                <StatValue>R$ {formatCurrency(totalMonthlyExpense)}</StatValue>
              </StatInfo>
              <StatIcon>
                <Ionicons name="calendar-outline" size={24} color="#6C63FF" />
              </StatIcon>
            </StatCard>
            
            <StatCard>
              <StatInfo>
                <StatLabel>Gasto Anual</StatLabel>
                <StatValue>R$ {formatCurrency(totalAnnualExpense)}</StatValue>
              </StatInfo>
              <StatIcon>
                <Ionicons name="calendar-outline" size={24} color="#6C63FF" />
              </StatIcon>
            </StatCard>
            
            {mostExpensiveSubscription && (
              <StatCard>
                <StatInfo>
                  <StatLabel>Assinatura mais Cara</StatLabel>
                  <StatValue>{mostExpensiveSubscription.serviceName}</StatValue>
                  <StatLabel>R$ {formatCurrency(mostExpensiveSubscription.price)}</StatLabel>
                </StatInfo>
                <StatIcon>
                  <Ionicons name="trending-up-outline" size={24} color="#FF3B30" />
                </StatIcon>
              </StatCard>
            )}
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>Distribuição de Assinaturas</ChartTitle>
            
            <StatCard>
              <StatInfo>
                <StatLabel>Assinaturas Ativas</StatLabel>
                <StatValue>{activeSubscriptions.length}</StatValue>
              </StatInfo>
              <StatIcon>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
              </StatIcon>
            </StatCard>
            
            <StatCard>
              <StatInfo>
                <StatLabel>Assinaturas Inativas</StatLabel>
                <StatValue>{inactiveSubscriptions.length}</StatValue>
              </StatInfo>
              <StatIcon>
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
              </StatIcon>
            </StatCard>
            
            <StatCard>
              <StatInfo>
                <StatLabel>Total de Assinaturas</StatLabel>
                <StatValue>{filteredSubscriptions.length}</StatValue>
              </StatInfo>
              <StatIcon>
                <Ionicons name="list-outline" size={24} color="#6C63FF" />
              </StatIcon>
            </StatCard>
          </ChartContainer>
        </ScrollView>
      ) : (
        <EmptyStateContainer>
          <Ionicons name="analytics-outline" size={80} color="#cccccc" />
          <EmptyStateText>
            Nenhuma assinatura encontrada para o período selecionado.
          </EmptyStateText>
        </EmptyStateContainer>
      )}
    </Container>
  );
}