import React from 'react'
import { Button, Modal, Text, View } from 'react-native'
import color from '../root/color'
import styles from '../root/styles'

type Props = {
    visible: boolean
    message: string
    onConfirm: () => void
    onCancel: () => void
    confirmText?: string
    cancelText?: string
    confirmColor?: string
};

export default function ConfirmModal({ visible, message, onConfirm, onCancel, confirmText = 'Excluir', cancelText = 'Cancelar', confirmColor = color.c5 }: Props) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.linha}>
                        <Button color={color.c4} title={cancelText} onPress={onCancel} />
                        <Button color={confirmColor} title={confirmText} onPress={onConfirm} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}