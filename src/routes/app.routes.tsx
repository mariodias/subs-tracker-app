import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { AddSubscription } from '@screens/AddSubscription';
import { SubscriptionDetails } from '@screens/SubscriptionDetails';
import { Statistics } from '@screens/Statistics';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="addSubscription" component={AddSubscription} />
      <Screen name="subscriptionDetails" component={SubscriptionDetails} />
      <Screen name="statistics" component={Statistics} />
    </Navigator>
  );
}
