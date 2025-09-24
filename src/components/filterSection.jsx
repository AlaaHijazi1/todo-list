import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import TaskProvider from "../context/tasksProvider";

function FilterSection() {
  const { filter, setFilter } = useContext(TaskProvider);
  return (
    <section className="FilterSection">
      <Stack className="FilterSection__filters" spacing={2} direction="row">
        <Typography
          variant="body1"
          className="FilterSection__text"
          sx={{ fontSize: "13px" }}
        >
          <FilterAltOutlinedIcon /> Filter :
        </Typography>
        <Button
          onClick={() => {
            setFilter("All");
          }}
          className="FilterSection__btn"
          color="secondary"
          variant={filter === "All" ? "contained" : "outlined"}
          sx={{ fontWeight: "bold" }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            setFilter("Pending");
          }}
          className="FilterSection__btn"
          color="secondary"
          variant={filter === "Pending" ? "contained" : "outlined"}
          sx={{ fontWeight: "bold" }}
        >
          Pending
        </Button>
        <Button
          onClick={() => {
            setFilter("Completed");
          }}
          className="FilterSection__btn"
          color="secondary"
          variant={filter === "Completed" ? "contained" : "outlined"}
          sx={{ fontWeight: "bold" }}
        >
          Completed
        </Button>
      </Stack>
    </section>
  );
}

export default FilterSection;
