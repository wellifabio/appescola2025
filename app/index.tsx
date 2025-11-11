import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  botao: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  textButton: {
    color: '#fff'
  }
})

export default function Index() {

  function login() {
    router.replace('/screens')
  }

  return (
    <View
      style={styles.conteiner}
    >
      <Text>E-mail</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => login()}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}
