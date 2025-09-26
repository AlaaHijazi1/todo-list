import { createContext } from "react";

const TaskContext = createContext({ tasks: [], setTasks: () => {} });

export default TaskContext;
