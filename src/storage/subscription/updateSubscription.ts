import AsyncStorage from "@react-native-async-storage/async-storage";

import { SUBSCRIPTION_COLLECTION } from "@storage/storageConfig";
import { SubscriptionStorageDTO } from "./subscriptionStorageDTO";

import { getAllSubscriptions } from "./getAllSubscriptions";
import { scheduleSubscriptionNotification, cancelSubscriptionNotifications } from "@services/NotificationService";

export async function updateSubscription(id: string, subscription: SubscriptionStorageDTO) {
  try {
    const storedSubscriptions = await getAllSubscriptions();
    const subscriptionIndex = storedSubscriptions.findIndex(sub => sub.id === id);
    if (subscriptionIndex !== -1) {
      storedSubscriptions[subscriptionIndex] = subscription;
      await AsyncStorage.setItem(SUBSCRIPTION_COLLECTION, JSON.stringify(storedSubscriptions));
      
      // Agenda ou cancela notificações com base no status da assinatura
      if (subscription.active) {
        await scheduleSubscriptionNotification(subscription);
      } else {
        await cancelSubscriptionNotifications(subscription.id);
      }
    }
  }
  catch (error) {
    console.error('Erro ao atualizar assinatura:', error);
    throw error;
  }
}

export async function updateSubscriptionStatus(id: string, active: boolean) {
  try {
    const storedSubscriptions = await getAllSubscriptions();
    const subscriptionIndex = storedSubscriptions.findIndex(sub => sub.id === id);
    
    if (subscriptionIndex !== -1) {
      const updatedSubscription = {
        ...storedSubscriptions[subscriptionIndex],
        active
      };
      
      storedSubscriptions[subscriptionIndex] = updatedSubscription;
      await AsyncStorage.setItem(SUBSCRIPTION_COLLECTION, JSON.stringify(storedSubscriptions));
      
      // Agenda ou cancela notificações com base no novo status da assinatura
      if (active) {
        await scheduleSubscriptionNotification(updatedSubscription);
      } else {
        await cancelSubscriptionNotifications(id);
      }
      
      return updatedSubscription;
    }
    
    return null;
  }
  catch (error) {
    console.error('Erro ao atualizar status da assinatura:', error);
    throw error;
  }
}