import { createContext, useState, useContext, useReducer } from "react";
import tasksReducer from "../reducers/tasksReducer";
const TaskContext = createContext({ tasks: [], setTasks: () => {} });

function TaskProvider({ children }) {
  const [filter, setFilter] = useState("All");
  const [Tasks, dispatch] = useReducer(tasksReducer, []);
  return (
    <TaskContext.Provider value={{ filter, setFilter, Tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  return useContext(TaskContext);
};

export default TaskProvider;
