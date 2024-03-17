import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Button } from "galio-framework";
import CartCard from "../components/CartCard";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const { cart } = useContext(CartContext)
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) =>
          <CartCard product={item.product} quantity={item.quantity}/>
        }
        keyExtractor={item=>item.product.id.toString()}
      />

      <Button
      icon="checkcircle"
      iconFamily="antdesign"
      iconSize={10}
      iconColor="#FFF"
      color="#000"
      onPress={()=>navigation.navigate("Payment")}
      >
        Finalizar Compra
      </Button>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#221f3b",
    flex: 1
  }
});
