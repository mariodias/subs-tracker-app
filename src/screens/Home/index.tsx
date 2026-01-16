import { useCallback, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { SubscriptionCard } from '@components/SubscriptionCard';
import { TotalExpensesCard } from '@components/TotalExpensesCard';

import { getAllSubscriptions } from '@storage/subscription/getAllSubscriptions';
import { SubscriptionStorageDTO } from '@storage/subscription/subscriptionStorageDTO';
import { scheduleAllSubscriptionNotifications } from '@services/NotificationService';

import {
  Container,
  Header,
  AddButton,
  AddButtonText,
  Title,
} from './styles';

export function Home() {


  const [subscriptions, setSubscriptions] = useState<SubscriptionStorageDTO[]>([]);

  const navigation = useNavigation();

  const expenses = subscriptions.reduce((acc, subscription) => {
      if (!subscription.active || subscription.period === 'Trial') {
        return acc;
      }
      
      const monthlyValue = subscription.period === 'Anual' 
        ? subscription.price / 12 
        : subscription.price;
      acc = acc + monthlyValue;
      return acc;
    }, 0);

  function handleNavigateToSubscriptionDetails(id: string) {
    navigation.navigate('subscriptionDetails', { id });
  }

  function handleNavigateToAddSubscription() {
    navigation.navigate('addSubscription');
  }

  function handleNavigateToStatistics() {
    navigation.navigate('statistics');
  }

  async function fetchSubscriptions()  {
    try {
      const data = await getAllSubscriptions();
      setSubscriptions(data);
      
      // Agenda notificações para todas as assinaturas ativas
      await scheduleAllSubscriptionNotifications(data);
      
    } catch (error) {
      console.error('Erro ao carregar assinaturas:', error);
      Alert.alert('SubsTracker', 'Não foi possível carregar as assinaturas. Tente novamente mais tarde.');
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
        <Title><Ionicons name="reload-circle" size={32} color="#6C63FF"/>SubsTracker</Title>
        <TouchableOpacity onPress={handleNavigateToStatistics}>
          <Ionicons name="stats-chart" size={28} color="#6C63FF"/>
        </TouchableOpacity>
      </Header>
      <TotalExpensesCard total={expenses} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        overScrollMode="always"
        >
        {subscriptions.map((subscription) => (
          <SubscriptionCard 
            id={subscription.id}
            key={subscription.id}
            serviceName={subscription.serviceName}
            icon={subscription.icon}
            price={subscription.price}
            period={subscription.period}
            active={subscription.active}
            onPress={() => handleNavigateToSubscriptionDetails(subscription.id)}
          />
        ))}
      </ScrollView>
      <AddButton onPress={handleNavigateToAddSubscription}>
        <AddButtonText>Adicionar assinatura</AddButtonText>
      </AddButton>
    </Container>
  );
}
