import { useState } from 'react';
import { ScrollView, Modal, FlatList, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { createSubscription } from '@storage/subscription/createSubscription';

import { availableServices, subscriptionPeriods, Service } from '@util/services';
import { applyValueMask } from '@util/apply-masks';

import {
  Container,
  Header,
  Title,
  Form,
  InputContainer,
  Label,
  Input,
  Select,
  SelectText,
  Button,
  ButtonText,
  Switch,
  SwitchContainer,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ServiceItem,
  ServiceName,
  ServiceIcon,
  PeriodItem,
  PeriodText,
  HeaderActions,
} from './styles';

export function AddSubscription() {

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [customServiceName, setCustomServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [paymentDate, setPaymentDate] = useState('');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);

  const navigation = useNavigation();

  function handleNavigateToHome() {
    navigation.navigate('home');
  };

  function handleValueChange(text: string) {
    const maskedValue = applyValueMask(text);
    setPrice(maskedValue);
  };
  
  function handleDateChange(text: string) {
    // Implementação básica de máscara para data no formato DD/MM/YYYY
    let maskedDate = text.replace(/\D/g, '');
    if (maskedDate.length > 0) {
      maskedDate = maskedDate.replace(/^(\d{2})(\d)/, '$1/$2');
      maskedDate = maskedDate.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
      maskedDate = maskedDate.substring(0, 10);
    }
    setPaymentDate(maskedDate);
  };
  
  function handleSelectService(service: Service) {
    setSelectedService(service);
    if (service.name !== 'other') {
      setCustomServiceName('');
    }
    setShowServiceModal(false);
  }

  function handleSelectPeriod(period: string) {
    setSelectedPeriod(period);
    setShowPeriodModal(false);
  }

  async function handleSaveSubscription() {
    try {
      if (!selectedService) {
        Alert.alert('SubsTracker', 'Por gentileza, selecione um serviço.');
        return;
      }
      
      if (selectedService.name === 'other' && !customServiceName) {
        Alert.alert('SubsTracker', 'Por gentileza, informe o nome do serviço.');
        return;
      }
      
      if (!price) {
        Alert.alert('SubsTracker', 'Por gentileza, informe o valor.');
        return;
      }
      
      const priceValue = parseFloat(price.replace(',', '.'));
      if (priceValue === 0 && selectedPeriod !== 'Trial') {
        Alert.alert('SubsTracker', 'Assinaturas que não são do tipo Trial não podem ter valor zero.');
        return;
      }
      
      if (!selectedPeriod) {
        Alert.alert('SubsTracker', 'Por gentileza, selecione a periodicidade.');
        return;
      }
      
      if (!paymentDate) {
        Alert.alert('SubsTracker', 'Por gentileza, informe a data de pagamento.');
        return;
      }
      
      // Validação simples da data
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(paymentDate)) {
        Alert.alert('SubsTracker', 'Por gentileza, informe uma data válida no formato DD/MM/YYYY.');
        return;
      }
      
      const serviceName = selectedService?.name === 'Outros' ? customServiceName : selectedService?.name;
      const id = new Date().getTime().toString();
      
      const data = await createSubscription({
        id,
        icon: selectedService?.icon || '',
        serviceName: serviceName || '',
        price: priceValue,
        period: selectedPeriod,
        active: isActive,
        paymentDate: paymentDate,
      });

      Alert.alert('SubsTracker', `Assinatura ${data.serviceName} salva com sucesso!`);
      navigation.navigate('home');
    } catch (error) {
      console.error('Erro ao salvar assinatura:', error);
      Alert.alert('SubsTracker', 'Ocorreu um erro ao salvar a assinatura.');
    }
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Ionicons name="chevron-back-outline" size={28} color="#6C63FF" />
        </TouchableOpacity>
        <Title>Nova Assinatura</Title>
        <Ionicons name="add-circle" size={28} color="#6C63FF" />
      </Header>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardDismissMode='on-drag'
        >
        <Form>
          <InputContainer>
            <Label>Serviço</Label>
            <Select onPress={() => setShowServiceModal(true)}>
              <SelectText>
                {selectedService?.name || 'Selecione um serviço'}
              </SelectText>
              <Ionicons name="chevron-down" size={20} color="#666666" />
            </Select>
          </InputContainer>
          {selectedService?.name === 'Outros' && (
            <InputContainer>
              <Label>Nome do Serviço</Label>
              <Input 
                placeholder="Digite o nome do serviço"
                value={customServiceName}
                onChangeText={setCustomServiceName}
              />
            </InputContainer>
          )}
          <InputContainer>
            <Label>Tipo</Label>
            <Select onPress={() => setShowPeriodModal(true)}>
              <SelectText>
                {selectedPeriod || 'Selecione o tipo de assinatura'}
              </SelectText>
              <Ionicons name="chevron-down" size={20} color="#666666" />
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Valor</Label>
            <Input 
              placeholder="0,00"
              keyboardType="decimal-pad"
              returnKeyType="done"
              value={price}
              onChangeText={handleValueChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Data de Pagamento</Label>
            <Input 
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
              returnKeyType="done"
              value={paymentDate}
              onChangeText={handleDateChange}
              maxLength={10}
            />
          </InputContainer>
          <InputContainer>
            <Label>Status</Label>
            <SwitchContainer>
              <SelectText>{isActive ? 'Assinatura Ativa' : 'Assinatura Inativa'}</SelectText>
              <Switch
                value={isActive}
                onValueChange={setIsActive}
                trackColor={{ true: '#6C63FF', false: '#ccc' }}
                thumbColor={isActive? '#fff' : '#fff'}
              />
            </SwitchContainer>
          </InputContainer>
        </Form>
      </ScrollView>
      <Modal
        visible={showServiceModal}
        animationType="slide"
        transparent>
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Selecione um serviço</ModalTitle>
              <TouchableOpacity onPress={() => setShowServiceModal(false)}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </ModalHeader>
            <FlatList
              data={availableServices}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <ServiceItem onPress={() => handleSelectService(item)}>
                  <ServiceIcon source={{ uri: item.icon }} />
                  <ServiceName>{item.name}</ServiceName>
                </ServiceItem>
              )}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
      <Modal
        visible={showPeriodModal}
        animationType="slide"
        transparent>
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Selecione o tipo de assinatura</ModalTitle>
              <TouchableOpacity onPress={() => setShowPeriodModal(false)}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </ModalHeader>
            <FlatList
              data={subscriptionPeriods}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <PeriodItem onPress={() => handleSelectPeriod(item.label)}>
                  <PeriodText>{item.label}</PeriodText>
                </PeriodItem>
              )}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
      <KeyboardAvoidingView behavior="padding">
      <Button onPress={handleSaveSubscription}>
        <ButtonText>Salvar Assinatura</ButtonText>
      </Button>
      </KeyboardAvoidingView>
    </Container>
  );
}