import { createContext } from "react";

const TaskProvider = createContext({ tasks: [], setTasks: () => {} });

export default TaskProvider;
