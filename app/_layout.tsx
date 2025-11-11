import { Stack, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  botao: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    marginRight: 10
  },
  textButton: {
    color: '#fff'
  }
})

export default function RootLayout() {

  function sair() {
    router.replace('/')
  }

  return <Stack
    screenOptions={{
      headerShown: true
    }}
  >
    <Stack.Screen name="index" options={{ title: "Tela de Login" }} />
    <Stack.Screen name="screens" options={{
      title: "Home", headerRight: () => (<TouchableOpacity
        style={styles.botao}
        onPress={() => sair()}>
        <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>)
    }} />
  </Stack>;
}
