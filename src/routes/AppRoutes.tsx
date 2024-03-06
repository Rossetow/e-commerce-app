import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import Menu from "../screens/Menu";
import Details from "../screens/Details";
import Cart from "../screens/Cart";
import Payment from "../screens/Payment";
import MenuHeader from "../components/MenuHeader";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "../screens/User";

const Stack = createNativeStackNavigator();

export const HomeRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTitle: "Lista de Produtos",
          headerRight: () => <MenuHeader />,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: "Detalhes",
          headerRight: () => <MenuHeader />,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerTitle: "Carrinho",
        }}
      />
      {/* <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerTitle: "Pagamento",
          headerRight: () => <MenuHeader />,
        }}
      /> */}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const AppRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoutes}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={30} color="#4169E1" />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="person" size={30} color="#4169E1" />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="person" size={50} color="#4169E1" />
          ),
        }}
      />

    </Tab.Navigator>
  );
};