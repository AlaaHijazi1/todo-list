import "./App.css";
import AddTask from "./components/addTask";
import TaskFilter from "./components/taskFilter";
import Tasks from "./components/tasks";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TaskProvider from "./context/tasksContext";
import ToastProvider from "./context/toastContext";

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
  return (
    <Container maxWidth="md" className="container">
      <Stack spacing={2}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <TaskProvider>
              <AddTask />
              <TaskFilter />
              <Tasks />
            </TaskProvider>
          </ToastProvider>
        </ThemeProvider>
      </Stack>
    </Container>
  );
}

export default App;
