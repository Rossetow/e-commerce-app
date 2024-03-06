import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const User = () => {
  const { user, logout } = useContext(UserContext)

  return (
    <View>
      <Text>Olá, {user?.firstName}</Text>
      <Image source={{uri: user?.image}} style= {styles.image} />
      <Text>Email: {user?.email}</Text>
      <Text>Username: {user?.username}</Text>
      <Text>Gender: {user?.gender}</Text>
      <Pressable onPress={()=>logout}>
        <Text>Sair</Text>
      </Pressable>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  image: {
    width:20,
    height: 20,
    borderRadius: 100
  }
});
