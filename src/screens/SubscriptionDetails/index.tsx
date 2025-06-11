import { useEffect, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { getSubscription } from '@storage/subscription/getSubscription';
import { deleteSubscription } from '@storage/subscription/deleteSubscription';
import { updateSubscriptionStatus } from '@storage/subscription/updateSubscription';

import {
  Container,
  Header,
  HeaderTitle,
  ServiceContainer,
  ServiceIcon,
  ServiceName,
  StatusBadge,
  StatusIndicator,
  StatusText,
  InfoSection,
  InfoRow,
  InfoLabel,
  InfoValue,
  EditButton,
  EditButtonText,
  Switch,
  SwitchContainer,
} from './styles';

type RouteParams = {
  id: string;
}

interface SubscriptionDetails {
  id: string;
  serviceName: string;
  icon: string;
  price: number;
  billingDate: string;
  period: string;
  active: boolean;
}

export function SubscriptionDetails() {

  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [tempIsActive, setTempIsActive] = useState<boolean>(false);

  const routes = useRoute();
  const params = routes.params as RouteParams;
  const navigation = useNavigation();

  function handleNavigateToHome() {
    navigation.navigate('home');
  }

  const handleToggleActive = () => {
    setTempIsActive(!tempIsActive);
  };

  async function getSubscriptionDetails() {
    try {
      const response = await getSubscription(params.id);
      setSubscriptionDetails(response);
      setIsActive(response.active);
      setTempIsActive(response.active);
    } catch (error) {
      console.error('Erro ao obter detalhes da assinatura:', error);
      Alert.alert('SubsTracker', 'Erro ao carregar detalhes da assinatura. Tente novamente.');
    }
  }

  async function handleDeleteSubscription(id: string) {
    try {
      await deleteSubscription(id);
      Alert.alert('SubsTracker', `Assinatura ${subscriptionDetails?.serviceName} excluída com sucesso!`);
      navigation.navigate('home');
    } catch (error) {
      console.error('Erro ao excluir assinatura:', error);
      Alert.alert('SubsTracker', 'Erro ao excluir assinatura. Tente novamente.');
    }
  }

  async function handleSaveSubscriptionStatus() {
    try {
      if (tempIsActive !== isActive) {
        await updateSubscriptionStatus(params.id, tempIsActive);
        setIsActive(tempIsActive);
        Alert.alert('SubsTracker', `Status da assinatura ${subscriptionDetails?.serviceName} atualizado com sucesso!`);
        navigation.navigate('home');
      } else {
        console.log('Status da assinatura não foi alterado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar status da assinatura:', error);
      Alert.alert('SubsTracker', 'Erro ao atualizar status da assinatura. Tente novamente.');
    }
  }

  useEffect(() => {
    getSubscriptionDetails();
  }, [params.id]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Ionicons name="chevron-back-outline" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <HeaderTitle>Detalhes da Assinatura</HeaderTitle>
        <TouchableOpacity onPress={() => handleDeleteSubscription(params.id)}>
            <Ionicons name="trash-outline" size={28} color="#FF3B30" />
          </TouchableOpacity>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ServiceContainer>
          <ServiceIcon source={{ uri: subscriptionDetails?.icon }} />
          <ServiceName>{subscriptionDetails?.serviceName}</ServiceName>
          <StatusBadge active={tempIsActive}>
            <StatusIndicator active={tempIsActive} />
            <StatusText active={tempIsActive}>
              {tempIsActive ? 'Ativa' : 'Inativa'}
            </StatusText>
          </StatusBadge>
        </ServiceContainer>
        <InfoSection>
          <InfoRow>
            <InfoLabel>Valor</InfoLabel>
            <InfoValue>$ {subscriptionDetails?.price.toFixed(2)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Tipo</InfoLabel>
            <InfoValue>Assinatura {subscriptionDetails?.period}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{tempIsActive ? 'Assinatura Ativa' : 'Assinatura Inativa'}</InfoLabel>
            <SwitchContainer>
              <Switch
                value={tempIsActive}
                onValueChange={handleToggleActive}
                trackColor={{ true: '#6C63FF', false: '#ccc' }}
                thumbColor={tempIsActive? '#fff' : '#fff'}
              />
            </SwitchContainer>
          </InfoRow>
        </InfoSection>
      </ScrollView>
      <EditButton onPress={() => handleSaveSubscriptionStatus()}>
        <EditButtonText>Atualizar status</EditButtonText>
      </EditButton>
    </Container>
  );
}