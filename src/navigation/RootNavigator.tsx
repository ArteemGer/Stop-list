import StockListEditScreen from "@/screens/StockEditScreen";
import StockListScreen from "@/screens/StopListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  StockList: undefined;
  StockListEdit: {
    itemId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="StockList"
          component={StockListScreen}
          options={{ title: "Стоп-лист" }}
        />

        <Stack.Screen
          name="StockListEdit"
          component={StockListEditScreen}
          options={{ title: "Изменение остатка" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
