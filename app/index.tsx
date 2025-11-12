import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MessageModal from "./components/MessageModal";
import api from "./root/api";
import color from "./root/color";

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.c2,
  },
  quadro: {
    width: "90%",
    height: "auto",
    borderColor: color.c4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: color.c1,
    color: color.c4,
    gap: 20,
    alignItems: "center"
  },
  botao: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: color.c3,
    textAlign: 'center'
  },
  textButton: {
    color: color.c1,
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
    borderColor: color.c3,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: color.c1,
    color: color.c3,
  },
})

export default function Index() {

  const [email, setEmail] = useState("robson@email.com")
  const [senha, setSenha] = useState("senha123")
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalTitle, setModalTitle] = useState("")

  async function login() {
    if (email.length > 0 && senha.length > 0) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"email":"${email}","senha":"${senha}"}`
      };
      const response = await fetch(`${api()}/login`, options)
      if (response.ok) {
        const resp = await response.json()
        await AsyncStorage.setItem('professor', JSON.stringify(resp)).catch(err => console.error(err))
        router.replace('/screens')
      } else {
        const resp = await response.json()
        setModalTitle("Acesso negado")
        setModalMessage(resp.message)
        setModalVisible(true)
      }
    } else {
      setModalTitle("Erro")
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
        title={modalTitle}
      />
    </View>
  );
}
