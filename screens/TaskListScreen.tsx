import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Modal, TextInput, TouchableOpacity, SectionList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import EventDetailsModal from '../components/EventDetailsModal';
import { TaskContext } from '../contexts/TaskContext';

type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskList'>;
type TaskListScreenRouteProp = RouteProp<RootStackParamList, 'TaskList'>;

type Task = {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
};

type Section = {
  title: string;
  data: Task[];
};

type Props = {
  navigation: TaskListScreenNavigationProp;
  route: TaskListScreenRouteProp;
};

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error('TaskContext must be used within a TaskProvider');
  }

  const { tasks, addTask, deleteTask } = taskContext;
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const handleAddTask = () => {
    const newTask: Task = {
      id: Math.random().toString(),
      name: taskName,
      date: taskDate.toLocaleDateString(),
      time: taskTime.toLocaleTimeString(),
      description: taskDescription,
    };
    addTask(newTask);
    setTaskName('');
    setTaskDate(new Date());
    setTaskTime(new Date());
    setTaskDescription('');
    setModalVisible(false);
  };

  const getSections = (): Section[] => {
    const sections: { [key: string]: Task[] } = {};

    tasks.forEach(task => {
      if (!sections[task.date]) {
        sections[task.date] = [];
      }
      sections[task.date].push(task);
    });

    return Object.keys(sections).map(date => ({
      title: date,
      data: sections[date],
    }));
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() => {
          setSelectedTask(item);
          setShowTaskDetails(true);
        }}
      >
        <Text style={styles.taskName}>{item.name}</Text>
        <Text style={styles.taskDate}>{item.time}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      <SectionList
        sections={getSections()}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        style={styles.taskList}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Name"
            value={taskName}
            onChangeText={setTaskName}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>Select Date: {taskDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={taskDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || taskDate;
                setShowDatePicker(Platform.OS === 'ios');
                setTaskDate(currentDate);
              }}
            />
          )}
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.datePickerText}>Select Time: {taskTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={taskTime}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                const currentTime = selectedTime || taskTime;
                setShowTimePicker(Platform.OS === 'ios');
                setTaskTime(currentTime);
              }}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {selectedTask && (
        <EventDetailsModal
          visible={showTaskDetails}
          task={selectedTask}
          onClose={() => setShowTaskDetails(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  taskList: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskItem: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
  },
  taskDate: {
    fontSize: 14,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
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

export default TaskListScreen;
