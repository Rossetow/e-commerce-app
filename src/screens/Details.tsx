import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { DetailsStackProps } from "../types/Navigation";
import { ProductDTO } from "../types/Products";
import { CartContext } from "../contexts/CartContext";
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'galio-framework'
import PagerView from "react-native-pager-view";
import Toast from "react-native-root-toast";




const Details = ({ route }: any) => {
  const { addProduct } = useContext(CartContext)

  // const { 
  //   id,
  //   title,
  //   description,
  //   price,
  //   discountPercentage,
  //   rating,
  //   stock,
  //   brand,
  //   category,
  //   thumbnail,
  //   images
  // } = route.params as ProductDTO

  const product: ProductDTO = route.params

  const confirm = (product: ProductDTO) => {
    addProduct(product);
    Toast.show("Adicionado com Sucesso !!!", {
      duration: 1500,
      position: Toast.positions.CENTER,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: "#050505",
      textColor: "#ebebeb",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInfos}>

        <Text
          style={styles.productTitle}>
          {product.title}
        </Text>

        <PagerView style={{ flex: 1 }} initialPage={0}>
          {product.images.map((image, index) => (
            <View key={index + 1}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </PagerView>

        <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 50}}>
          <Text style={styles.productDescription}>
            {product.description}
          </Text>
          <Text style={styles.productPrice}>
            $ {product.price}                   ★{product.rating}
          </Text>
          <Button
            textStyle={{ color: "#ebebeb", }}
            capitalize
            icon="shoppingcart"
            iconFamily="antdesign"
            iconSize={16}
            iconColor="black"
            color="#6f4a8e"
            onPress={() => {
              addProduct(product)
              confirm(product)
            }}
            style={{height: 60, width: 250}}
          >
            Adicionar ao carrinho
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#221f3b',
    alignItems: 'center'
  },
  productTitle: {
    fontSize: 30,
    color: "#ebebeb"
  },
  productDescription: {
    color: "#ebebeb",
    fontSize: 20

  },
  productPrice: {
    color: "#ebebeb",
    fontSize: 17

  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 5
  },
  containerInfos : {
    justifyContent: "center", 
    flex: 1,
    width: "90%", 
    borderStyle: 'solid',
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 5,
    margin: 20,
    marginBottom: 150,
    padding: 10
  }
});
