import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./root/styles";

export default function RootLayout() {

  const [homeTitle, setHomeTitle] = useState("Home")

  useEffect(() => {
    validaSessao();
    const interval = setInterval(() => {
      validaSessao();
    }, 30000);
    return () => clearInterval(interval);
  }, [])

  async function validaSessao() {
    const professor = await AsyncStorage.getItem('professor').catch(err => console.error(err))
    //Se existir o item 'professor' no storage configura o nome dele como título
    //Senão direciona para a tela de login
    if (professor) {
      const professorObject = JSON.parse(String(professor))
      setHomeTitle(`Professor: ${professorObject.nome}`)
    } else {
      router.replace('/')
    }
  }

  async function sair() {
    await AsyncStorage.removeItem('professor').catch(err => console.error(err));
    router.replace('/')
  }

  return <Stack
    screenOptions={{
      headerShown: true
    }}
  >
    <Stack.Screen name="index" options={{ title: "Tela de Login" }} />
    <Stack.Screen name="screens" options={{
      title: homeTitle, headerRight: () => (<TouchableOpacity
        style={styles.button}
        onPress={() => sair()}>
        <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>)
    }} />
  </Stack>;
}
