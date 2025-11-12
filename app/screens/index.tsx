import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import MessageModal from "../components/MessageModal"
import api from "../root/api"
import styles from "./styles"

export default function Index() {

    const [professor, setProfessor] = useState({ id: null })
    const [turmas, setTurmas] = useState<any[]>([])
    const [nome, setNome] = useState("")

    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [modalTitle, setModalTitle] = useState("")

    useEffect(() => {
        obterProfessor()
    }, [])

    useEffect(() => {
        obterTurmas()
    }, [professor])

    async function obterProfessor() {
        const professor = await AsyncStorage.getItem('professor').catch(err => console.error(err))
        if (professor) {
            setProfessor(JSON.parse(String(professor)))
        }
    }

    async function obterTurmas() {
        if (professor.id) {
            const response = await fetch(`${api()}/turmas`)
            const result = await response.json()
            const filtered = Array.isArray(result) ? result.filter((t: any) => t.professorId === professor.id) : []
            setTurmas(filtered)
        }
    }

    async function toAtividades(turmaId: any) {
        try {
            const updatedProfessor = { ...professor, turmaId }
            setProfessor(updatedProfessor)
            await AsyncStorage.setItem('professor', JSON.stringify(updatedProfessor))
        } catch (err) {
            console.error('Erro ao salvar professor com turmaId:', err)
        }
        router.replace('/screens/atividades')
    }

    async function novaTurma() {
        if (nome.length > 0) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/11.6.1' },
                body: `{"nome":"${nome}","professorId":${professor.id}}`
            };
            const response = await fetch(`${api()}/turmas`, options)
            if (response.ok) {
                obterTurmas()
                setNome("")
            }
        } else {
            setModalTitle("Importante")
            setModalMessage("Preencha o nome da turma")
            setModalVisible(true)
        }
    }

    return (
        <View
            style={styles.conteiner}
        >
            <View style={styles.quadro}>
                <Text style={styles.title}>Turmas do Professor:</Text>
                <FlatList
                    style={styles.lista}
                    data={turmas}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => toAtividades(item.id)}>
                            <Text style={styles.textItem}>{item.nome}</Text>
                        </TouchableOpacity>)}
                />
            </View>
            <View style={styles.quadro}>
                <Text style={styles.title}>Nova Turma:</Text>
                <TextInput
                    placeholder="Nome da turma"
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => novaTurma()}>
                    <Text style={styles.textItem}>Registrar</Text>
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
