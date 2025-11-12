import { StyleSheet } from "react-native"
import color from "./color"

const styles = StyleSheet.create({
    conteiner1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.c2,
    },
    conteiner2: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: color.c2,
        overflowY: 'auto'
    },
    quadro: {
        width: "90%",
        margin: 5,
        borderColor: color.c4,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.c1,
        alignItems: "center",
        maxHeight:"60%",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        maxWidth: '60%'
    },
    lista: {
        width: "100%",
    },
    item: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.c4,
    },
    textItem: {
        color: color.c1
    },
    atividade: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color.c3,
        backgroundColor: color.c2
    },
    textAtividade: {
        color: color.c3
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.c3,
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    textButton: {
        color: color.c1,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        width: "100%",
        marginTop: 10,
        borderColor: color.c3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.c1,
        color: color.c3,
    },
    alterInput: {
        width:'78%',
        marginTop:10,
        borderColor: color.c3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        color: color.c3,
    },
    linha: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: color.t1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '80%',
        backgroundColor: color.c1,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalText: {
        marginBottom: 12,
        color: color.c3,
    },
    modalButton: {
        marginTop: 8,
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.c4,
    }
})

export default styles