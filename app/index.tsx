import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MessageModal from "./components/MessageModal";

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  quadro: {
    width: "90%",
    height: "auto",
    borderColor: "#35797d",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#35797d",
    gap: 20,
    alignItems: "center"
  },
  botao: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    textAlign: 'center'
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16
  },
  input: {
    width: "100%",
    borderColor: "#35797d",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#35797d",
  },
})

export default function Index() {

  const api = "https://escola-api-2025-b.vercel.app"
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  async function login() {
    if (email.length > 0 && senha.length > 0) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"email":"${email}","senha":"${senha}"}`
      };
      const response = await fetch(`${api}/login`, options)
      if (response.ok) {
        const resp = await response.json()
        await AsyncStorage.setItem('professor', String(response)).catch(err => console.error(err));
        router.replace('/screens')
      } else {
        const resp = await response.json()
        setModalMessage(resp.message)
        setModalVisible(true)
      }
    } else {
      setModalMessage("Preencha os campos email e senha")
      setModalVisible(true)
    }
  }

  return (
    <View
      style={styles.conteiner}
    >
      <View style={styles.quadro}>
        <Text style={styles.title}>Bem vindo</Text>
        <TextInput
          placeholder="Digite o e-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Digite a senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.botao}
          onPress={() => login()}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
