import { StatusBar } from 'expo-status-bar';
import { Routes } from '@routes/index';
import { useEffect } from 'react';
import { requestNotificationPermissions } from '@services/NotificationService';

export default function App() {
  useEffect(() => {
    // Solicita permissões de notificação ao iniciar o app
    requestNotificationPermissions();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Routes />
    </>
  );
}