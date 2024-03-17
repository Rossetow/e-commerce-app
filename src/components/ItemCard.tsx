import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProductDTO } from "../types/Products";
import { CartContext } from "../contexts/CartContext";

interface Props {
  product: ProductDTO;
}
const ItemCard = ({ product }: Props) => {
  const navigation = useNavigation<any>();

  const { addProduct } = useContext(CartContext)

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", product)} style={styles.container}>
      <View style={styles.content}>
          <Image
            style={styles.image}
            source={{ uri: product.thumbnail }}
          />
        <View style={styles.divisor}>
          <View style={styles.info}>
            <Text style={{ fontSize: 25, fontWeight: "500", textTransform: 'capitalize', color: '#ebebeb' }}>{product.title}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontStyle: 'italic', fontSize: 20, fontWeight: 'bold', color: '#5438DC' }}>$ {product.price} </Text>
            <Text style={{ fontStyle: 'italic', fontSize: 15, color: '#ebebeb' }}>★{product.rating} </Text>
          </View>
          <TouchableOpacity onPress={() => addProduct(product)} style={styles.button}>
            <Text style={{color: "#ebebeb"}}>
              Adicionar ao carrinho
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  content: {
    alignItems: "center",
    flex: 1,
    margin: 20,
    flexDirection: 'row',
  },
  divisor: {
  flex: 1,
  marginLeft: 20
  }, 
  info: {
    flexDirection: 'row',
    alignItems: "center"
  },
  button: {
    textAlign: 'center',
    backgroundColor: "#6f4a8e",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  }
});