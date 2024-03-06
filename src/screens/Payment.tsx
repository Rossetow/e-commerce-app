import { Button, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SelectDropdown, DropdownData } from "expo-select-dropdown";
import axios from "axios";
import { StateDTO } from "../types/States";
import { CityDTO } from "../types/Cities";
import { PaymentMethod } from "../types/PaymentMethod";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment = () => {
 
  console.log("chegou")

  const [isVisible, setIsVisible] = useState(true)

  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('')
  const [adress, setAdress] = useState('')
  const [adressExtra, setAdressExtra] = useState('')
  const [userState, setUserState] = useState('')
  const [cardExpire, setCardExpire] = useState('')
  const [cities, setCities] = useState<CityDTO[]>([])
  const [userCity, setUserCity] = useState('')

  const [selectedState, setStateSelected] = useState<DropdownData<string, string> | null>(null)

  const [dataState, setDataState] = useState<DropdownData<string, string>[]>([])

  const [dataCity, setDataCity] = useState<DropdownData<string, string>[]>([])

  const [selectedCity, setCitySelected] = useState<DropdownData<string, string> | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    id: '',
    cardNumber: '',
    cardExpire: '',
    adress: '',
    state: null,
    city: null,
  })
  //Api de estados e cidades

  useEffect(() => {
    const getStates = async () => {
      try {
        const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

        const response = await axios.get(urlStates);
        const arrStates: DropdownData<string, string>[] = []
        response.data.estados.forEach((state: { sigla: string; nome: string; }) => {
          const { sigla, nome } = state
          arrStates.push({key: sigla, value: nome})
        });
        setDataState(arrStates)

        if (paymentMethod.cardNumber === '') {
          return
        } else {

          setAdress(paymentMethod.adress)
          setCardNumber(paymentMethod.cardNumber)
          setStateSelected(paymentMethod.state)
          setStateForUser()
          setCitySelected(paymentMethod.city)
        }

      } catch (error) {
      }
    };
    getStates();
  }, []);

  const setStateForUser = async () => {
    try {
      const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState?.key}/distritos`

      const response = await axios.get<{ cidades: CityDTO[] }>(urlCities);
      const arrCities: DropdownData<string, string>[] = []
      response.data.cidades.forEach(city => {
        arrCities.push({ key: city.id, value: city.nome })
      });
      setDataCity(arrCities)
    } catch (err) {
      console.log("err:", err)
    }
  }

  useEffect(() => {
    setStateForUser()
  }, [selectedState])

  

  const pay = () => {
    console.log("pago")
    setIsVisible(false)
  }

  const savePaymentInfo = async() => {
    const paymentInfo: PaymentMethod = {
      id: '',
      cardNumber,
      cardExpire,
      adress: adress,
      state: selectedState!,
      city: selectedCity!
    }

    try {
    const jsonValue = JSON.stringify(paymentInfo);
    await AsyncStorage.setItem('@paymentInfo', jsonValue)
    } catch (e) {
      console.log("Error", e)
    }




    setPaymentMethod(paymentInfo)


  }

  return (
    <View>
      <TextInput
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="0000 0000 0000 0000"
      />
      <TextInput
        value={adress}
        onChangeText={setAdress}
        placeholder="Endereço de cobrança"
      />

      <TextInput
        value={adressExtra}
        onChangeText={setAdressExtra}
        placeholder="Bloco, apt, suite, etc (opcional)"
      />

      <SelectDropdown
        data={dataState}
        placeholder={"Selecione seu estado"}
        selected={selectedState}
        setSelected={setStateSelected}
        searchOptions={{ cursorColor: "#007bff" }}
        searchBoxStyles={{ borderColor: "#007bff" }}
        dropdownStyles={{ borderColor: "#007bff" }}
      />

      <SelectDropdown
        data={dataCity}
        placeholder={"Selecione sua cidade"}
        selected={selectedCity}
        setSelected={setCitySelected}
        searchOptions={{ cursorColor: "#007bff" }}
        searchBoxStyles={{ borderColor: "#007bff" }}
        dropdownStyles={{ borderColor: "#007bff" }}
      />

      {/* <Dropdown
        icon='chevron-down'
        iconColor='#E1E1E1'
        label='Selecione a cidade'
        data={cities}
        onChangeText={setUserCity}
        
      /> */}

      <TextInput
        value={cvv}
        onChangeText={setCvv}
        placeholder="000"
      />

      <Button
        title="Pagar"
        onPress={() => pay()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >

        <View>
          <Text>
            Você gostaria de salvar as informações de pagamento?
          </Text>
          <Pressable onPress={savePaymentInfo}>
            <Text>
              Sim
            </Text>
          </Pressable>
          <Pressable onPress={() => setIsVisible(false)}>
            <Text>
              Não
            </Text>
          </Pressable>
        </View>

      </Modal>

    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});
