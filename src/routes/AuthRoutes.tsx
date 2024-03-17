import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import User from "../screens/User";

const Stack = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};
