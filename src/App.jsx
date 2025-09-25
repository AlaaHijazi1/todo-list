import "./App.css";
import AddSection from "./components/addSection";
import FilterSection from "./components/filterSection";
import Tasks from "./components/tasks";
import Snackbars from "./components/snackBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TaskProvider from "./context/tasksProvider";
import ToastContext from "./context/toastContext";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ebe2dbff",
    },
    secondary: {
      main: "#151513",
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showHideToast = (message) => {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <Container maxWidth="md" className="container">
      <Stack spacing={2}>
        <ThemeProvider theme={theme}>
          <ToastContext.Provider value={{ showHideToast }}>
            <TaskProvider.Provider
              value={{ tasks, setTasks, filter, setFilter }}
            >
              <AddSection />
              <FilterSection />
              <Tasks />
              <Snackbars open={open} message={message} />
            </TaskProvider.Provider>
          </ToastContext.Provider>
        </ThemeProvider>
      </Stack>
    </Container>
  );
}

export default App;
