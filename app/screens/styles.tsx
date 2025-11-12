import { StyleSheet } from "react-native"
import color from "../root/color"

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.c2
    },
    quadro: {
        width: "90%",
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
    }
})

export default styles