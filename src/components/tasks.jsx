import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TaskItem from "./taskItem";
import { useContext, useState } from "react";
import TaskProvider from "../context/tasksProvider";

function Tasks() {
  const { tasks, filter } = useContext(TaskProvider);
  const [editingId, setEditingId] = useState(null);

  const filterdTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    else if (filter === "Pending") return !task.isCompleted;
    else return task.isCompleted;
  });

  return (
    <section className="tasksSection">
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
          />
        ))
      )}
    </section>
  );
}

export default Tasks;
