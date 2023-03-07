import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Flag from "./components/Flag";
import Maps from "./components/Maps";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Maps"
          options={{ headerShown: false }}
          component={Maps}
        />
        <Stack.Screen
          name="Flags"
          options={{ headerShown: false }}
          component={Flag}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
