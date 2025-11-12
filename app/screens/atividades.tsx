import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import ConfirmModal from '../components/ConfirmModal'
import MessageModal from "../components/MessageModal"
import api from "../root/api"
import styles from "../root/styles"

export default function Index() {
  const [professor, setProfessor] = useState({ turmaId: null })
  const [turma, setTurma] = useState({ nome: null, atividades: [] })
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")

  const [modalConfirmVisible, setModalConfirmVisible] = useState(false)
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
      setNome(result.nome)
    }
  }

  async function novaAtividade() {
    if (descricao.length > 0) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  async function excluirTurma() {
    const response = await fetch(`${api()}/turmas/${professor.turmaId}`, { method: 'DELETE' })
    if (response.ok) {
      router.replace('/screens')
    }
  }

  async function alterarTurma() {
    if (nome.length > 0) {
      const response = await fetch(`${api()}/turmas/${professor.turmaId}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: `{"nome":"${nome}"}`
      })
      if (response.ok) {
        obterTurma()
      }
    } else {
      setModalTitle("Importante")
      setModalMessage("Preencha o nome da turma")
      setModalVisible(true)
    }
  }

  function voltar() {
    router.replace('/screens')
  }

  return (
    <View
      style={styles.conteiner2}
    >
      <View style={styles.quadro}>
        <View style={styles.linha}>
          <Text style={styles.title}>{turma.nome}</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setModalConfirmVisible(true)}>
            <Text style={styles.textItem}>Excluir Turma</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.lista}
          data={turma.atividades}
          renderItem={({ item }) => (
            <View style={styles.atividade}>
              <Text style={styles.textAtividade}>{item['descricao']}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.quadro}>
        <View style={styles.linha}>
          <TextInput
            style={styles.alterInput}
            value={nome}
            onChangeText={setNome}
          />
          <TouchableOpacity
            style={styles.item}
            onPress={() => alterarTurma()}>
            <Text style={styles.textItem}>Alterar</Text>
          </TouchableOpacity>
        </View>
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
            style={styles.button}
            onPress={() => voltar()}>
            <Text style={styles.textItem}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmModal
        visible={modalConfirmVisible}
        message={'Tem certeza que deseja excluir esta turma com todas as atividades? Essa ação não poderá ser desfeita.'}
        onCancel={() => setModalConfirmVisible(false)}
        onConfirm={() => { setModalConfirmVisible(false); excluirTurma(); }}
        confirmText={'Excluir'}
        cancelText={'Cancelar'}
      />
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
      />
    </View>
  );
}
