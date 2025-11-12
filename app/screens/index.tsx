import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import api from "../root/api"
import styles from "./styles"

export default function Index() {

    const [professor, setProfessor] = useState({ id: null })
    const [turmas, setTurmas] = useState<any[]>([])

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
        </View>
    );
}
