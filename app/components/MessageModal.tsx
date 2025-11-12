import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import color from '../root/color';

type Props = {
    visible: boolean;
    message: string | null;
    onClose: () => void;
    title?: string;
};

const styles = StyleSheet.create({
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
    modalClose: {
        marginTop: 8,
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.c4,
    }
});

export default function MessageModal({ visible, message, onClose, title }: Props) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    {title ? <Text style={styles.modalTitle}>{title}</Text> : null}
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable style={styles.modalClose} onPress={onClose}>
                        <Text style={{ color: color.c1, fontWeight: 'bold' }}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}