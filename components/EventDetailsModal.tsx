import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Task = {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
};

type EventDetailsModalProps = {
  visible: boolean;
  task: Task;
  onClose: () => void;
};

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ visible, task, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.detail}>Name: {task.name}</Text>
          <Text style={styles.detail}>Date: {task.date}</Text>
          <Text style={styles.detail}>Time: {task.time}</Text>
          <Text style={styles.detail}>Description: {task.description}</Text>
          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: '#F0BFEC',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default EventDetailsModal;
