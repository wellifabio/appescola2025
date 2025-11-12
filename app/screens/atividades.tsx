import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import MessageModal from "../components/MessageModal"
import api from "../root/api"
import styles from "./styles"

export default function Index() {
  const [professor, setProfessor] = useState({ turmaId: null })
  const [turma, setTurma] = useState({ nome: null, atividades: [] })
  const [descricao, setDescricao] = useState("")

  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalTitle, setModalTitle] = useState("")

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

  async function novaAtividade() {
    if (descricao.length > 0) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/11.6.1' },
        body: `{"descricao":"${descricao}","turmaId":${professor.turmaId}}`
      };
      const response = await fetch(`${api()}/atividades`, options)
      if (response.ok) {
        obterTurma()
        setDescricao("")
      }
    } else {
      setModalTitle("Importante")
      setModalMessage("Preencha a descrição")
      setModalVisible(true)
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
              <Text style={styles.textItem}>{item['descricao']}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.quadro}>
        <Text style={styles.title}>Nova Atividade:</Text>
        <TextInput
          placeholder="Descrição da atividade"
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />
        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => novaAtividade()}>
            <Text style={styles.textItem}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => voltar()}>
            <Text style={styles.textItem}>Voltar</Text>
          </TouchableOpacity>
        </View>
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
