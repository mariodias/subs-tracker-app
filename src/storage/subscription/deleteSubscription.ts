import AsyncStorage from '@react-native-async-storage/async-storage';

import { SUBSCRIPTION_COLLECTION } from '@storage/storageConfig';
import { getAllSubscriptions } from './getAllSubscriptions';
import { cancelSubscriptionNotifications } from '@services/NotificationService';


export async function deleteSubscription(id: string) {
  try {
    // Cancela todas as notificações para esta assinatura
    await cancelSubscriptionNotifications(id);

    const storedSubscriptions = await getAllSubscriptions();
    const filteredSubscriptions = storedSubscriptions.filter(subscription => subscription.id !== id);
    await AsyncStorage.setItem(SUBSCRIPTION_COLLECTION, JSON.stringify(filteredSubscriptions));
    
  } catch (error) {
    console.error('Erro ao remover assinatura:', error);
    throw error;
  }
}