import { v4 as uuidv4 } from "uuid";

function tasksReducer(curentTasks, action) {
  switch (action.type) {
    case "added": {
      const Task = {
        id: uuidv4(),
        text: action.payload.title,
        date: new Date(),
        isCompleted: false,
      };
      const updatedTasks = [...curentTasks, Task];
      window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "delete": {
      const updateTasks = curentTasks.filter(
        (task) => task.id !== action.payload.id
      );
      window.localStorage.setItem("tasks", JSON.stringify(updateTasks));
      return updateTasks;
    }
    case "edit": {
      const updateTasks = curentTasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            text: action.payload.editText.trim() || task.text,
          };
        }
        return task;
      });
      window.localStorage.setItem("tasks", JSON.stringify(updateTasks));
      return updateTasks;
    }

    case "get": {
      const tasksFromStorage =
        JSON.parse(window.localStorage.getItem("tasks")) || [];
      return tasksFromStorage;
    }

    case "toggle": {
      const updateTasks = curentTasks.map((task) => {
        if (task.id == action.payload.id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });
      window.localStorage.setItem("tasks", JSON.stringify(updateTasks));
      return updateTasks;
    }

    default:
      throw Error("Unknown Action");
  }
}

export default tasksReducer;
