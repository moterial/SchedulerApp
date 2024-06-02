import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import TaskListScreen from '../screens/TaskListScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ChatScreen from '../screens/ChatScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  TaskList: undefined;
  Calendar: undefined;
  Chat: undefined;
  EventDetails: { eventId: string };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="TaskList"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'TaskList') {
            iconName = require('../assets/icons/task-list.png');
          } else if (route.name === 'Calendar') {
            iconName = require('../assets/icons/calendar.png');
          } else if (route.name === 'Chat') {
            iconName = require('../assets/icons/chat.png');
          }

          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarActiveTintColor: 'pink',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="TaskList" component={TaskListScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}
