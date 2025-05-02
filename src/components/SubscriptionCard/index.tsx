import { TouchableOpacityProps } from 'react-native';
import {
  Card,
  ServiceIcon,
  SubscriptionInfo,
  ServiceName,
  Price,
  Details,
  Period,
  StatusIndicator,
} from './styles';

type Subscription = TouchableOpacityProps & {
  id: string;
  serviceName: string;
  icon: string;
  price: number;
  billingDate: string;
  period: string;
  active?: boolean;
}

export function SubscriptionCard({
  id, 
  serviceName, 
  icon, 
  price, 
  billingDate, 
  period,
  active = true, 
  ...rest
}: Subscription) {
  return (
    <Card id={id} {...rest}>
      <StatusIndicator active={active} />
      <ServiceIcon source={{uri: icon}} />
      <SubscriptionInfo>
        <ServiceName>{serviceName}</ServiceName>
        <Price>R$ {price.toFixed(2)}</Price>
        <Details>Próxima cobrança: {billingDate}</Details>
      </SubscriptionInfo>
      <Period>{period}</Period>
    </Card>
  );
}