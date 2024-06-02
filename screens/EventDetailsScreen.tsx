import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';

type EventDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EventDetails'>;
type EventDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

type Props = {
  navigation: EventDetailsScreenNavigationProp;
  route: EventDetailsScreenRouteProp;
};

const EventDetailsScreen: React.FC<Props> = ({ route }) => {
  const { eventId } = route.params;
  // 这里应该根据 eventId 从任务列表中获取任务的详细信息
  // 由于在此示例中没有实际的任务数据源，这里将展示假数据
  const task = {
    name: 'Sample Task',
    date: '2024-06-15',
    time: '14:00',
    description: 'This is a sample task description.',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Details</Text>
      <Text style={styles.detail}>Name: {task.name}</Text>
      <Text style={styles.detail}>Date: {task.date}</Text>
      <Text style={styles.detail}>Time: {task.time}</Text>
      <Text style={styles.detail}>Description: {task.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default EventDetailsScreen;
