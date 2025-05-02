import AsyncStorage from "@react-native-async-storage/async-storage";

import { SUBSCRIPTION_COLLECTION } from "@storage/storageConfig";

export async function getSubscription(id: string) {
  try {
    const storage = await AsyncStorage.getItem(SUBSCRIPTION_COLLECTION);
    const subscriptions: any[] = storage ? JSON.parse(storage) : [];
    const subscription = subscriptions.find((subscription) => subscription.id === id);
    return subscription;
  } catch (error) {
    console.error('Erro ao buscar assinatura:', error);
    throw error;
  }
}