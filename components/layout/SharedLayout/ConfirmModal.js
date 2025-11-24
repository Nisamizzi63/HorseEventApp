import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import palette from '../../colors/palette';

const ConfirmModal = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          width: '80%',
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 12,
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {title}
          </Text>

          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            {message}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={onCancel} style={{ marginRight: 20 }}>
              <Text style={{ fontSize: 16, color: palette.darkblue }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ fontSize: 16, color: palette.pink}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;