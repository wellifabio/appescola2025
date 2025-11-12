import { StyleSheet } from "react-native"
import color from "../root/color"

const styles = StyleSheet.create({
    conteiner: {
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
        alignItems: "center"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
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
    input: {
        width: "100%",
        borderColor: color.c3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.c1,
        color: color.c3,
    },
    linha: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})

export default styles