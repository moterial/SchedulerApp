import React, { useContext, useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { TaskContext } from '../contexts/TaskContext';

type Task = {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
};

const CalendarScreen: React.FC = () => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { tasks } = taskContext;
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const getMarkedDates = () => {
    const markedDates: { [key: string]: { marked: boolean } } = {};
    tasks.forEach(task => {
      markedDates[task.date] = { marked: true };
    });
    return markedDates;
  };

  const getTasksForDate = (date: string): Task[] => {
    tasks.forEach(task => {
      console.log('task', task);
    }
    );
    console.log('date', date);
    return tasks.filter(task => task.date === date);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskName}>{item.name}</Text>
      <Text style={styles.taskTime}>{item.time}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={getMarkedDates()}
        onDayPress={(day: DateObject) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tasks for {selectedDate}</Text>
            <FlatList
              data={getTasksForDate(selectedDate)}
              keyExtractor={(item) => item.id}
              renderItem={renderTask}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
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
    width: '80%', // Adjust the width to ensure the modal is not too wide
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  taskName: {
    fontSize: 18,
  },
  taskTime: {
    fontSize: 14,
    color: 'gray',
  },
  taskDescription: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default CalendarScreen;
