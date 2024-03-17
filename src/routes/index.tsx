import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Routes = () => {
  const { getToken, token, setToken, user } = useContext(UserContext);
  useEffect(() => {
    getToken();
  }, []);
  
  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};