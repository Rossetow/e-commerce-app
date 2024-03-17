import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import Menu from "../screens/Menu";
import Details from "../screens/Details";
import Cart from "../screens/Cart";
import Payment from "../screens/Payment";
import MenuHeader from "../components/MenuHeader";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "../screens/User";
import { StyleSheet } from "react-native";
import Login from "../screens/Login";

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
          headerStyle: {
            backgroundColor: "#6f4a8e"
          },
          headerTintColor: "#ebebeb"
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: "Detalhes",
          headerRight: () => <MenuHeader />,
          headerStyle: {
            backgroundColor: "#6f4a8e"
          },
          headerTintColor: "#ebebeb"
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerTitle: "Carrinho",
          headerStyle: {
            backgroundColor: "#6f4a8e"
          },
          headerTintColor: "#ebebeb"
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerTitle: "Pagamento",
          headerRight: () => <MenuHeader />,
          headerStyle: {
            backgroundColor: "#6f4a8e"
          },
          headerTintColor: "#ebebeb"
        }}
      />
      <Stack.Screen
        name="User"
        component={User}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        />
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
        tabBarActiveBackgroundColor: "#6f4a8e",
        tabBarInactiveBackgroundColor: "#6f4a8e"
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoutes}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={30} color="#ebebeb" />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="person" size={30} color="#ebebeb" />
          ),
          tabBarStyle: {
            backgroundColor: "#ebebeb"
          }
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6f4a8e"
  }
})