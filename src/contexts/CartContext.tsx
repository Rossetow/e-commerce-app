import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICartItem, ProductDTO } from "../types/Products";
import Toast from "react-native-root-toast";

type CartContextProps = {
  cart: ICartItem[];
  getCart: () => void;
  addProduct: (product: ProductDTO) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const storeCart = async (value: ICartItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cart", jsonValue);
    } catch (error) {
      Toast.show("Não foi possível salvar o carrinho", {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const getCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@cart");
      const cartData = jsonValue !== null ? JSON.parse(jsonValue) : [];
      setCart(cartData);
    } catch (error) {
      Toast.show("Não foi possível recuperar o carrinho", {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };
  

  const addProduct = (value: ProductDTO) => {
    const existingProduct = cart.find(({ product }) => value.id === product.id);

    if (existingProduct) {
      const newcart = cart.map((item) =>
        item.product.id === existingProduct.product.id
          ? { ...item, quantity: item.quantity ? item.quantity + 1 : 1 }
          : item
      );

      setCart(newcart);
      storeCart(newcart);
    } else {
      const newCart = [...cart];
      const data: ICartItem = { product: value, quantity: 1 };
      newCart.push(data);
      setCart(newCart);
      storeCart(newCart);
    }
    console.log(cart)
  };

  const removeProduct = (id: number) => {
    const produtoExisteId = cart.findIndex(({ product }) => id === product.id);
  
    if (produtoExisteId !== -1) {
      const carrinhoAtualizado = [...cart];
      const produtoExistente = carrinhoAtualizado[produtoExisteId];
      
      if (produtoExistente.quantity > 1) {
     
        carrinhoAtualizado[produtoExisteId] = { ...produtoExistente, quantity: produtoExistente.quantity - 1 };
      } else {
        carrinhoAtualizado.splice(produtoExisteId, 1);
      }
  
      setCart(carrinhoAtualizado);
      storeCart(carrinhoAtualizado);
    } 
  };

  const clearCart = () => {
    console.log("oi")
    setCart([])
    AsyncStorage.setItem("@cart", "")
  }

  return (
    <CartContext.Provider value={{ cart, getCart, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
