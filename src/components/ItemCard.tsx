import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ProductDTO } from "../types/Products";

interface Props {
  product: ProductDTO;
}
const ItemCard = ({ product }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details")}>
      <View>
        <View>
          <Image
            resizeMode="center"
            style={{ width: 100, height: 100 }}
            source={{ uri: product.thumbnail }}
          />

          <View>
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text>$ {product.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({});