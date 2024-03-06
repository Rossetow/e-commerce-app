import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MenuHeader = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
      <MaterialIcons name="shopping-cart" size={40} color="#4169E1" />
    </TouchableOpacity>
  );
};

export default MenuHeader;

const styles = StyleSheet.create({});