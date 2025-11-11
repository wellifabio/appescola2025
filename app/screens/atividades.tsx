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

  function voltar() {
    router.replace('/screens')
  }

  return (
    <View
      style={styles.conteiner}
    >
      <Text>Atividades!</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => voltar()}>
        <Text style={styles.textButton}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
}
