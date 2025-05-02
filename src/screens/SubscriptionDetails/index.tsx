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
  HeaderActions,
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

  const handleToggleActive = () => {
    setTempIsActive(!tempIsActive);
  };

  function handleNavigateToHome() {
    navigation.navigate('home');
  }

  async function getSubscriptionDetails() {
    try {
      const response = await getSubscription(params.id);
      setSubscriptionDetails(response);
      setIsActive(response.active);
      setTempIsActive(response.active);
    } catch (error) {
      console.error('Erro ao obter detalhes da assinatura:', error);
      Alert.alert('Erro', 'Erro ao carregar detalhes da assinatura. Tente novamente.');
    }
  }

  async function handleDeleteSubscription(id: string) {
    try {
      await deleteSubscription(id);
      Alert.alert('Sucesso!', 'Assinatura excluída com sucesso!');
      navigation.navigate('home');
    } catch (error) {
      console.error('Erro ao excluir assinatura:', error);
      Alert.alert('Erro', 'Erro ao excluir assinatura. Tente novamente.');
    }
  }

  async function handleSaveSubscriptionStatus() {
    try {
      if (tempIsActive !== isActive) {
        await updateSubscriptionStatus(params.id, tempIsActive);
        setIsActive(tempIsActive);
        Alert.alert('Sucesso', 'Status da assinatura atualizado com sucesso!');
        navigation.navigate('home');
      } else {
        console.log('Status da assinatura não foi alterado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar status da assinatura:', error);
      Alert.alert('Erro', 'Erro ao atualizar status da assinatura. Tente novamente.');
    }
  }

  useEffect(() => {
    getSubscriptionDetails();
  }, [params.id]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <HeaderActions>
          <TouchableOpacity onPress={() => handleDeleteSubscription(params.id)}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </HeaderActions>
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
            <InfoValue>R$ {subscriptionDetails?.price.toFixed(2)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Periodicidade</InfoLabel>
            <InfoValue>{subscriptionDetails?.period}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Próxima Cobrança</InfoLabel>
            <InfoValue>{subscriptionDetails?.billingDate}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Assinatura Ativa</InfoLabel>
            <SwitchContainer>
              <Switch
                value={tempIsActive}
                onValueChange={handleToggleActive}
              />
            </SwitchContainer>
          </InfoRow>
        </InfoSection>
      </ScrollView>
      <EditButton onPress={() => handleSaveSubscriptionStatus()}>
        <EditButtonText>Editar Assinatura</EditButtonText>
      </EditButton>
    </Container>
  );
}