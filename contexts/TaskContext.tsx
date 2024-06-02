import React, { createContext, useState, ReactNode } from 'react';

type Task = {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
