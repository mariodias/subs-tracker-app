import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { SubscriptionStorageDTO } from '@storage/subscription/subscriptionStorageDTO';

// Configuração das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Solicita permissões de notificação
 * @returns Promise com o status da permissão
 */
export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Apenas solicita permissão se não foi determinada ainda
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // Verifica se a plataforma é iOS para solicitar permissões adicionais
  if (Platform.OS === 'ios') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#6C63FF',
    });
  }

  return finalStatus === 'granted';
}

/**
 * Agenda uma notificação para uma assinatura
 * @param subscription Dados da assinatura
 * @returns ID da notificação agendada
 */
export async function scheduleSubscriptionNotification(subscription: SubscriptionStorageDTO) {
  // Cancela notificações existentes para esta assinatura
  await cancelSubscriptionNotifications(subscription.id);
  
  // Se a assinatura não estiver ativa, não agenda notificação
  if (!subscription.active) {
    return null;
  }

  // Converte a data de pagamento para um objeto Date
  const [day, month, year] = subscription.paymentDate.split('/');
  const paymentDate = new Date(`${year}-${month}-${day}T12:00:00`);
  
  // Verifica se a data é válida
  if (isNaN(paymentDate.getTime())) {
    console.error('Data de pagamento inválida:', subscription.paymentDate);
    return null;
  }

  // Calcula a próxima data de pagamento
  const nextPaymentDate = getNextPaymentDate(paymentDate, subscription.period);
  
  // Se a próxima data já passou, calcula a próxima
  const now = new Date();
  let notificationDate = nextPaymentDate;
  
  while (notificationDate < now) {
    notificationDate = getNextPaymentDate(notificationDate, subscription.period);
  }
  
  // Configura a notificação para 9h da manhã no dia do pagamento
  notificationDate.setHours(9, 0, 0, 0);
  
  // Formata o valor para exibição
  const formattedPrice = subscription.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  // Agenda a notificação
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Vencimento de Assinatura',
      body: `Sua assinatura de ${subscription.serviceName} no valor de ${formattedPrice} vence hoje!`,
      data: { subscriptionId: subscription.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: notificationDate
    },
  });

  return notificationId;
}

/**
 * Cancela todas as notificações agendadas para uma assinatura
 * @param subscriptionId ID da assinatura
 */
export async function cancelSubscriptionNotifications(subscriptionId: string) {
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  
  for (const notification of scheduledNotifications) {
    if (notification.content.data?.subscriptionId === subscriptionId) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  }
}

/**
 * Agenda notificações para todas as assinaturas ativas
 * @param subscriptions Lista de assinaturas
 */
export async function scheduleAllSubscriptionNotifications(subscriptions: SubscriptionStorageDTO[]) {
  // Solicita permissões primeiro
  const hasPermission = await requestNotificationPermissions();
  
  if (!hasPermission) {
    console.log('Permissões de notificação não concedidas');
    return;
  }
  
  // Agenda notificações para cada assinatura ativa
  for (const subscription of subscriptions) {
    if (subscription.active) {
      await scheduleSubscriptionNotification(subscription);
    }
  }
}

/**
 * Calcula a próxima data de pagamento com base na periodicidade
 * @param currentDate Data atual de pagamento
 * @param period Periodicidade (Mensal, Anual, Trial)
 * @returns Próxima data de pagamento
 */
function getNextPaymentDate(currentDate: Date, period: string): Date {
  const nextDate = new Date(currentDate);
  
  switch (period) {
    case 'Mensal':
      // Avança um mês
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'Anual':
      // Avança um ano
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    case 'Trial':
      // Para Trial, assume-se 30 dias
      nextDate.setDate(nextDate.getDate() + 30);
      break;
    default:
      // Caso padrão, avança um mês
      nextDate.setMonth(nextDate.getMonth() + 1);
  }
  
  return nextDate;
}