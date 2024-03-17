import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { Button } from "galio-framework";
import { ProductDTO } from "../types/Products";
import { Card } from "@ant-design/react-native";
import { CartContext } from "../contexts/CartContext";

interface Props {
  product: ProductDTO;
  quantity: number;
}

const CartCard = ({ product, quantity }: Props) => {

  const { addProduct, removeProduct } = useContext(CartContext)

  return (
    <View style = {styles.containerGeral}>
<View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 18, color: "#ebebeb" }}>{product.title}</Text>
        <Image
          style={styles.image}
          source={{ uri: product.thumbnail }}
        />
      </View>
      <View style={{flex: 3, alignItems: "center", justifyContent: "center"}}>
        <Text style={{ color: '#ebebeb' }}>Quantidade: {quantity}</Text>
        <Text style={{ fontSize: 20, color: '#ebebeb' }}>${product.price}</Text>
        <Text style={{ color: '#ebebeb' }}>{product.stock} em estoque</Text>
        
      </View >
      <View style={{flex: 3}}>
      <Button
          icon="plus"
          iconFamily="antdesign"
          iconSize={10}
          iconColor="#ebebeb"
          color="#6f4a8e"
          onPress={() => addProduct(product)}
          style ={styles.button}
        >
          Adicionar
        </Button>
        <Button
          icon="minus"
          iconFamily="antdesign"
          iconSize={10}
          iconColor="#ebebeb"
          color="#283654"
          onPress={() => removeProduct(product.id)}
          style ={styles.button}

        >
          Remover
        </Button>
      </View>
    </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  containerGeral: {
    flex: 1,
    marginTop: 30
  },
  container: {
    backgroundColor: "#221f3b",
    flexDirection: "row",
    flex: 1,
    marginLeft: 10
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10
  },
  title: {
    justifyContent: "center",
    flex: 3
  },
  button: {
    width: 100
  }

});
