import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { useToast } from "../context/toastContext";

function AddTask() {
  const [taskName, setTaskName] = useState("");
  const { dispatch } = useTasks();
  const { showHideToast } = useToast();

  const handleAddClick = (e) => {
    e.preventDefault();
    dispatch({ type: "added", payload: { title: taskName } });
    showHideToast("New task added!");
    setTaskName("");
  };

  useEffect(() => {
    dispatch({ type: "get" });
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

export default AddTask;
