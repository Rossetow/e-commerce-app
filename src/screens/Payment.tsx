import { Modal, Pressable, SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SelectDropdown from 'react-native-select-dropdown';
import { StateDTO } from "../types/States";
import { CityDTO } from "../types/Cities";
import { PaymentMethod } from "../types/PaymentMethod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import { CartContext } from "../contexts/CartContext";
import { Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
const Payment = () => {

  const navigation = useNavigation<any>();

  const { clearCart, cart } = useContext(CartContext)

  const [isVisible, setIsVisible] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [adress, setAdress] = useState('');
  const [adressExtra, setAdressExtra] = useState('');
  const [cardExpire, setCardExpire] = useState('');

  const [selectedState, setStateSelected] = useState<StateDTO | null>(null);

  const [dataState, setDataState] = useState<StateDTO[]>([]);

  const [dataCity, setDataCity] = useState<CityDTO[]>([]);

  const [selectedCity, setCitySelected] = useState<CityDTO | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    id: '',
    cardNumber: '',
    cardExpire: '',
    adress: '',
    state: null,
    city: null,
  });
  //Api de estados e cidades
  useEffect(() => {
    const getStates = async () => {
      try {
        const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

        const response = await axios.get<StateDTO[]>(urlStates);
        const arrStates: Array<StateDTO> = [];
        response.data.forEach((state: { id: number; nome: string; }) => {
          arrStates.push(state);
        });
        setDataState(arrStates);
      } catch (error) {
      }
    };
    getStates();
  }, []);

  const setStateForUser = async () => {
    if (dataState) {
      try {
        const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState?.id}/distritos?orderBy=nome`;

        const response = await axios.get<CityDTO[]>(urlCities);
        let arrCities: CityDTO[] = [];
        response.data.forEach((cities: { id: number; nome: string; }) => {
          arrCities.push(cities);
        });
        arrCities = response.data;
        setDataCity(arrCities);
      } catch (err) {
        console.log("err:", err);
      }
    }
  };

  useEffect(() => {
    setStateForUser();
  }, [selectedState]);

  const pay = () => {
    setIsVisible(true)
    clearCart
  };

  const savePaymentInfo = async () => {
    const paymentInfo: PaymentMethod = {
      id: '',
      cardNumber,
      cardExpire,
      adress: adress,
      state: selectedState,
      city: selectedCity
    };

    try {
      const jsonValue = JSON.stringify(paymentInfo);
      await AsyncStorage.setItem('@paymentInfo', jsonValue);
    } catch (e) {
      console.log("Error", e);
    }
    setPaymentMethod(paymentInfo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="0000 0000 0000 0000"
        placeholderTextColor="#ebebeb"
        style={styles.input} />
      <TextInput
        value={adress}
        onChangeText={setAdress}
        placeholder="Endereço de cobrança"
        placeholderTextColor="#ebebeb"
        style={styles.input} />

      <TextInput
        value={adressExtra}
        onChangeText={setAdressExtra}
        placeholder="Bloco, apt, suite, etc (opcional)"
        placeholderTextColor="#ebebeb"
        style={styles.input} />

      <View style={styles.dropdown}>
        <SelectDropdown
          data={dataState}
          onSelect={(selectedItem, index) => {
            selectedItem.dropdownId = index;
            setStateSelected(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.nome;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.nome;
          }}
          defaultButtonText="Selecione seu país"
          searchPlaceHolder="Pesquisar..."
          rowStyle={{ backgroundColor: "#ebebeb" }} />
      </View>

      <View style={styles.dropdown}>
        <SelectDropdown
          data={dataCity}
          onSelect={(selectedItem, index) => {
            setCitySelected(selectedItem);
            console.log(index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.nome;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.nome;
          }}
          disabled={selectedState ? false : true}
          defaultButtonText="Selecione sua cidade"
          search={true}
          searchPlaceHolder="Pesquisar..." />
      </View>

      <TextInput
        value={cvv}
        onChangeText={setCvv}
        placeholder="000"
        style={styles.input}
        placeholderTextColor="#ebebeb" />

      <TouchableOpacity style={styles.button} onPress={
        pay
      }>
        <Text
          style={{ color: "#ebebeb", fontSize: 20, marginRight:10 }}>
          Pagar
        </Text>
        <AntDesign name="checkcircleo" size={20} color="green" />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        visible={isVisible}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
        style={{justifyContent: "center", alignItems:"center", flex:1}}
      >

        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={styles.modal}>
          <Text style={{fontSize:17, color: "#ebebeb"}}>
            Compra finalizada!
          </Text>
          <View style={{flexDirection: "row"}}>
          <Pressable
          style={{height: 40, width: 200, backgroundColor: "#ebebeb", marginVertical: 10, marginHorizontal: 15, justifyContent: "center", alignItems: "center"}}
          onPress={() => {
            navigation.navigate("Menu")
          }}>
            <Text style={{color: "#1c1e24"}}>
              Voltar ao menu principal
            </Text>
          </Pressable>
          </View>
        </View>
        </View>

      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1e24",
  },
  input: {
    color: "#ebebeb",
    paddingVertical: 10,
    backgroundColor: "#6f4a8e",
    width: 300,
    textAlign: "center",
    marginVertical: 3
  },
  dropdown: {
    marginVertical: 10
  },
  button: {
    backgroundColor: "#283654",
    paddingVertical: 10,
    width: 250,
    marginTop: 10,
    alignItems: "center",
    justifyContent:"center",
    flexDirection:"row"
  },
  modal: {
    width: 350,
    height: 200,
    backgroundColor: "#283654",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  }
});


export default Payment