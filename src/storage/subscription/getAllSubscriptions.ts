import AsyncStorage from '@react-native-async-storage/async-storage';

import { SUBSCRIPTION_COLLECTION } from '@storage/storageConfig';
import { SubscriptionStorageDTO } from './subscriptionStorageDTO';

export async function getAllSubscriptions(): Promise<SubscriptionStorageDTO[]> {
  try {
    const storage = await AsyncStorage.getItem(SUBSCRIPTION_COLLECTION);
    
    const subscriptions: SubscriptionStorageDTO[] = storage ? JSON.parse(storage) : [];
    
    return subscriptions;
  } catch (error) {
    console.error('Erro ao buscar assinaturas:', error);
    return [];
  }
}