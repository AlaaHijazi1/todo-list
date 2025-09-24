import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect } from "react";
import TaskProvider from "../context/tasksProvider";

function AddSection() {
  const [taskName, setTaskName] = useState("");
  const { tasks, setTasks } = useContext(TaskProvider);

  const handleAddClick = (e) => {
    e.preventDefault();
    const Task = {
      id: uuidv4(),
      text: taskName,
      date: new Date(),
      isCompleted: false,
    };
    const updatedTasks = [...tasks, Task];
    setTasks(updatedTasks);
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskName("");
  };

  useEffect(() => {
    const tasksFromStorage =
      JSON.parse(window.localStorage.getItem("tasks")) || [];
    setTasks(tasksFromStorage);
  }, []);

  return (
    <section className="AddSection">
      <h1 className="AddSection__title">My Tasks</h1>
      <p className="AddSection__text">Stay organized, stay focused</p>
      <Stack
        className="AddSection__form"
        alignItems="center"
        justifyContent="center"
      >
        <form className="form" onSubmit={handleAddClick}>
          <input
            className="form__input"
            aria-label="Task name"
            type="text"
            name="task"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            required
            placeholder="What needs to be done?"
          />
          <Button
            className="form__submit"
            type="submit"
            color="secondary"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </form>
      </Stack>
    </section>
  );
}

export default AddSection;
