import { RootSiblingParent } from "react-native-root-siblings";
import { Routes } from "./src/routes";
import { UserContextProvider } from "./src/contexts/UserContext";
import { CartContextProvider } from "./src/contexts/CartContext";

export default function App() {
  return (
    <RootSiblingParent>
      <UserContextProvider>
        <CartContextProvider>
          <Routes />
        </CartContextProvider>
      </UserContextProvider>
    </RootSiblingParent>
  );
}