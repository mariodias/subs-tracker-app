import AsyncStorage from '@react-native-async-storage/async-storage';

import { SUBSCRIPTION_COLLECTION } from '@storage/storageConfig';
import { getAllSubscriptions } from './getAllSubscriptions';
import { SubscriptionStorageDTO } from './subscriptionStorageDTO';
import { scheduleSubscriptionNotification } from '@services/NotificationService';

export async function createSubscription(newSubscription: SubscriptionStorageDTO) {
  try {
    const storedSubscriptions = await getAllSubscriptions();
    const subscriptionAlreadyExists = storedSubscriptions.some(
      subscription => subscription.id === newSubscription.id
    );
    
    const storage = subscriptionAlreadyExists
      ? storedSubscriptions.map(item => 
          item.id === newSubscription.id ? newSubscription : item
        )
      : [...storedSubscriptions, newSubscription];
    
    await AsyncStorage.setItem(
      SUBSCRIPTION_COLLECTION, 
      JSON.stringify(storage)
    );
    
    // Agenda notificação para a nova assinatura ou atualiza a existente
    if (newSubscription.active) {
      await scheduleSubscriptionNotification(newSubscription);
    }
    
    return newSubscription;
  } catch (error) {
    console.error('Erro ao salvar assinatura:', error);
    throw error;
  }
}