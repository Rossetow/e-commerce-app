import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";



const User = () => {
  const { user, logout } = useContext(UserContext)

  const navigation = useNavigation<any>();

  return (
    <SafeAreaProvider style = {styles.container}>
      <SafeAreaView style = {{alignItems: "center"}}>
      <Text style ={{fontSize: 40, color: "#ebebeb"}}>Olá, {user?.firstName}</Text>
      <View>
      <Image source={{uri: user?.image}} style= {styles.image} />
      <Text style={{fontSize: 20, marginTop: 15, color: "#ebebeb"}}>Email: {user?.email}</Text>
      <Text style={{fontSize: 20, marginTop: 15, color: "#ebebeb"}}>Username: {user?.username}</Text>
      <Text style={{fontSize: 20, marginTop: 15, color: "#ebebeb"}}>Gender: {user?.gender}</Text>
      <Pressable style = {styles.button} onPress={()=>{
        logout
      }}>
        <Text style={{fontSize: 20, marginTop: 15, color: "#ebebeb"}}>
          Sair
        </Text>
      </Pressable>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default User;

const styles = StyleSheet.create({
  image: {
    width:200,
    height: 200,
    borderRadius: 100
  },
  container: {
    alignItems: 'center',
    height:"100%",
    justifyContent: 'center',
    backgroundColor: "#221f3b"
  },
  button : {
    backgroundColor: "#6f4a8e",
    height: 60,
    borderRadius: 5,
    alignItems: 'center'
  }
});
