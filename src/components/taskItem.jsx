import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { useToast } from "../context/toastContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function TaskItem({ task, editingId, setEditingId, showDialog }) {
  const { tasks, setTasks } = useTasks();
  const isEdeting = task.id == editingId;
  const [editText, setEditText] = useState(task.text);
  const { showHideToast } = useToast();

  const handleCheckCliked = (id) => {
    const updateTasks = tasks.map((task) => {
      if (task.id == id) {
        const wasIncomplete = !task.isCompleted;
        task.isCompleted = !task.isCompleted;
        if (wasIncomplete && task.isCompleted) {
          showHideToast("Task completed successfully!");
        }
      }
      return task;
    });
    setTasks(updateTasks);
    window.localStorage.setItem("tasks", JSON.stringify(updateTasks));
  };

  const handleEditClick = (id) => {
    const updateTasks = tasks.map((task) => {
      if (task.id == id) {
        editText.trim() === "" ? setEditText(task.text) : null;
        return { ...task, text: editText ? editText : task.text };
      }
      return task;
    });
    setTasks(updateTasks);
    showHideToast("Task updated successfully!");
    window.localStorage.setItem("tasks", JSON.stringify(updateTasks));
    setEditingId(null);
  };

  const handelFormattedDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <Stack
        className="tasksSection__TaskItem"
        spacing={2}
        mt={4}
        mb={-2}
        p={{ xs: 4, sm: 3 }}
        justifyContent="center"
        alignItems="start"
      >
        <Stack
          className="TaskItem__content"
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            className="TaskItem__content-task"
            direction="row"
            spacing={{ xs: 0, sm: 2 }}
          >
            <Checkbox
              {...label}
              color="secondary"
              checked={task.isCompleted}
              onChange={() => {
                handleCheckCliked(task.id);
              }}
            />

            <input
              type="text"
              disabled={!isEdeting}
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
              }}
              className={`TaskItem__content-input ${
                task.isCompleted && "completed-task"
              }`}
            />
          </Stack>

          <Stack className="TaskItem__content-action" direction="row">
            {!isEdeting ? (
              <>
                <EditOutlinedIcon
                  onClick={() => {
                    if (!task.isCompleted) setEditingId(task.id);
                  }}
                  sx={{
                    color: "#6a6c67",
                    fontSize: "17px",
                    padding: "7px",
                    borderRadius: "5px",
                  }}
                  className="TaskItem__content-edit"
                />
                <DeleteOutlinedIcon
                  onClick={() => {
                    showDialog(task.id);
                  }}
                  sx={{
                    color: "#b71c1c",
                    fontSize: "17px",
                    padding: "7px",
                    borderRadius: "5px",
                  }}
                  className="TaskItem__content-delete"
                />
              </>
            ) : (
              <>
                <CheckIcon
                  onClick={() => {
                    handleEditClick(task.id);
                  }}
                  sx={{
                    color: "#6a6c67",
                    fontSize: "17px",
                    padding: "7px",
                    borderRadius: "5px",
                  }}
                  className="TaskItem__content-check"
                />
                <CloseIcon
                  onClick={() => {
                    setEditingId(null);
                    setEditText(task.text);
                  }}
                  sx={{
                    color: "#b71c1c",
                    fontSize: "17px",
                    padding: "7px",
                    borderRadius: "5px",
                  }}
                  className="TaskItem__content-close"
                />
              </>
            )}
          </Stack>
        </Stack>
        <small className="TaskItem__date">
          <CalendarMonthIcon sx={{ fontSize: "15px" }} /> created
          {handelFormattedDate(task.date)}
        </small>
      </Stack>
    </>
  );
}

export default TaskItem;
