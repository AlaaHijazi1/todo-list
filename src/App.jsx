import "./App.css";
import AddSection from "./components/addSection";
import FilterSection from "./components/filterSection";
import Tasks from "./components/tasks";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TaskProvider from "./context/tasksProvider";
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

  return (
    <Container maxWidth="md" className="container">
      <Stack spacing={2}>
        <ThemeProvider theme={theme}>
          <TaskProvider.Provider value={{ tasks, setTasks, filter, setFilter }}>
            <AddSection />
            <FilterSection />
            <Tasks />
          </TaskProvider.Provider>
        </ThemeProvider>
      </Stack>
    </Container>
  );
}

export default App;
