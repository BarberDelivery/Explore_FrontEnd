import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage } from './component/HomePage';
import MapsPage from './component/MapsPage';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Maps" component={MapsPage} />
        <Tab.Screen name="Home" component={HomePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}