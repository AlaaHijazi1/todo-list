import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TaskItem from "./taskItem";
import { useContext, useState, useMemo } from "react";
import TaskProvider from "../context/tasksProvider";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ToastContext from "../context/toastContext";

function Tasks() {
  const { tasks, setTasks, filter } = useContext(TaskProvider);
  const { showHideToast } = useContext(ToastContext);

  const [editingId, setEditingId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTaskID, setDialogTaskID] = useState(null);
  const filterdTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "All") return true;
      else if (filter === "Pending") return !task.isCompleted;
      else return task.isCompleted;
    });
  }, [tasks, filter]);

  const handleDeleteConfirm = (id) => {
    const updateTasks = tasks.filter((task) => task.id !== id);
    setTasks(updateTasks);
    window.localStorage.setItem("tasks", JSON.stringify(updateTasks));
    setShowDeleteDialog(false);
    showHideToast("Task Deleted Successfuly!");
  };

  const handleShowDeleteDialog = (id) => {
    setDialogTaskID(id);
    setShowDeleteDialog(true);
  };

  return (
    <section className="tasksSection">
      <Dialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              setShowDeleteDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              handleDeleteConfirm(dialogTaskID);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Stack
        className="tasksSection__info"
        direction="row"
        mt={3}
        justifyContent="space-between"
        alignItems="start"
      >
        <Typography variant="h5">{filter} Tasks</Typography>
        <Typography variant="body2" sx={{ color: "#6a6c67" }}>
          {filterdTasks.length} Tasks
        </Typography>
      </Stack>
      {filterdTasks.length === 0 ? (
        <Typography mt={5} variant="body1" sx={{ color: "#6a6c67" }}>
          {filter === "All" && "No Tasks Added"}
          {filter === "Pending" && "No Pending Tasks"}
          {filter === "Completed" && "No Completed Tasks"}
        </Typography>
      ) : (
        filterdTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editingId={editingId}
            setEditingId={setEditingId}
            showDialog={handleShowDeleteDialog}
          />
        ))
      )}
    </section>
  );
}

export default Tasks;
