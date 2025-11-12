import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import api from "../root/api"
import styles from "./styles"

export default function Index() {
  const [professor, setProfessor] = useState({ turmaId: null })
  const [turma, setTurma] = useState({ atividades: [] })

  useEffect(() => {
    obterProfessor()
  }, [])

  useEffect(() => {
    obterTurma()
  }, [professor])

  async function obterProfessor() {
    const professor = await AsyncStorage.getItem('professor').catch(err => console.error(err))
    if (professor) {
      setProfessor(JSON.parse(String(professor)))
    }
  }

  async function obterTurma() {
    if (professor.turmaId) {
      const response = await fetch(`${api()}/turmas/${professor.turmaId}`)
      const result = await response.json()
      setTurma(result)
    }
  }

  function voltar() {
    router.replace('/screens')
  }

  return (
    <View
      style={styles.conteiner}
    >
      <View style={styles.quadro}>
        <Text style={styles.title}>{turma.nome}</Text>
        <FlatList
          style={styles.lista}
          data={turma.atividades}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.descricao}</Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => voltar()}>
        <Text style={styles.textItem}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
}
