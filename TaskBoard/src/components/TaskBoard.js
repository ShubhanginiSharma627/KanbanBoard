import { Login } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Grid, Paper, Popover, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createTask, deleteTask, getTasks, updateTask } from "../utils/api"; // Import API functions
import DroppableTaskColumn from "./DroppableTaskColumn";
import TaskColumn from "./TaskColumn";
import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";

const TaskBoard = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [filters, setFilters] = useState({
        assignee: undefined,
        status: "",
        startDate: "",
        endDate: "",
    });
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [taskColumns, setTaskColumns] = useState([
        { status: "To Do", tasks: [] },
        { status: "In Progress", tasks: [] },
        { status: "Done", tasks: [] },
    ]);

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await getTasks();
                console.log(tasks);
                setAllTasks(tasks);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    // Update filtered tasks whenever all tasks or filters change
    useEffect(() => {
        filterTasks(filters);
    }, [allTasks, filters]);

    // Update task columns when filtered tasks change
    useEffect(() => {
        const updateColumnsTasks = () => {
            setTaskColumns((prevColumns) =>
                prevColumns.map((column) => ({
                    ...column,
                    tasks: filteredTasks.filter(
                        (task) => task.status === column.status
                    ),
                }))
            );
        };
        updateColumnsTasks();
    }, [filteredTasks]);

    const handleOpenTaskForm = () => {
        setOpenTaskForm(true);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const email = localStorage.getItem("email");
    const handleDeleteTask = useCallback(async (taskId) => {
        try {
            await deleteTask(taskId);
            setAllTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== taskId)
            );
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    }, []);

    const handleAddTask = useCallback(async (newTask) => {
        try {
            const createdTask = await createTask(newTask);
            setAllTasks((prevTasks) => [...prevTasks, createdTask]);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    }, []);

    const handleUpdateTask = useCallback(async (updatedTask) => {
        try {
            const task = await updateTask(updatedTask);
            setAllTasks((prevTasks) =>
                prevTasks.map((t) => (t._id === task._id ? task : t))
            );
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    }, []);

    const filterTasks = useCallback(
        (filters) => {
            const { assignee, status, startDate, endDate } = filters;
            const filtered = allTasks.filter((task) => {
                const assigneeLowerCase = assignee
                    ? assignee.toLowerCase().trim().replace(/\s/g, "")
                    : "";
                const taskAssignee = task.assignee
                    ? task.assignee.toLowerCase().trim().replace(/\s/g, "")
                    : "";
                const isAssigneeMatch =
                    !assignee || taskAssignee.includes(assigneeLowerCase);
                const isStatusMatch =
                    !status || task.status === status || status === "All";
                const isStartDateMatch =
                    !startDate ||
                    new Date(task.startDate) >= new Date(startDate);
                const isEndDateMatch =
                    !endDate || new Date(task.startDate) <= new Date(endDate);
                return (
                    isAssigneeMatch &&
                    isStatusMatch &&
                    isStartDateMatch &&
                    isEndDateMatch
                );
            });
            setFilteredTasks(filtered);
            setFilters(filters);
        },
        [allTasks]
    );

    const handleDrop = (item, columnStatus) => {
        const { id, sourceStatus } = item;

        if (sourceStatus !== columnStatus) {
            onUpdateTask(id, columnStatus);
        }
    };

    const onUpdateTask = async (taskId, newStatus) => {
        const tasks = await getTasks();
        setAllTasks(tasks);
        const taskToUpdate = tasks.find((task) => task._id === taskId);
        if (taskToUpdate) {
            handleUpdateTask({ ...taskToUpdate, status: newStatus });
        }
    };
    const handlePersonIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        // Redirect to login page, assuming you're using React Router
        window.location.href = "/login";
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{
                    minHeight: "100vh",
                    paddingTop: "2rem",
                    marginLeft: "2rem",
                    marginRight: "2rem",
                    paddingBottom: "2rem",
                }}
            >
                <div
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                    }}
                >
                    <h1>Task Board</h1>
                    <PersonIcon
                        sx={{
                            backgroundColor: "whitesmoke",
                            padding: "1rem",
                            borderRadius: "50px",
                            fontSize: "40px",
                            cursor: "pointer",
                        }}
                        onClick={handlePersonIconClick}
                    />
                    <Popover
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        sx={{
                            marginTop: "0.3rem",
                        }}
                    >
                        <Box p={2}>
                            <Typography variant="subtitle1">{email}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogout}
                                sx={{ mt: 1 }}
                            >
                                Logout <Login />
                            </Button>
                        </Box>
                    </Popover>
                </div>
                <Paper
                    sx={{
                        backgroundColor: "#0000",
                        boxShadow: "none",
                        border: "1px solid #fff",
                        paddingX: "2rem",
                        paddingY: "2rem",
                    }}
                >
                    <div
                        style={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <TaskFilter onFilter={filterTasks} />
                        <Button
                            variant="contained"
                            onClick={handleOpenTaskForm}
                            sx={{ margin: "1rem" }}
                        >
                            Add New Task
                        </Button>
                    </div>
                    <TaskForm
                        open={openTaskForm}
                        onClose={() => setOpenTaskForm(false)}
                        onSubmit={handleAddTask}
                    />
                    <Grid container spacing={2}>
                        {taskColumns.map(({ status, tasks }) => (
                            <Grid item xs={12} md={4} key={status}>
                                <DroppableTaskColumn
                                    status={status}
                                    onDrop={handleDrop}
                                    allTasks={allTasks}
                                >
                                    <TaskColumn
                                        status={status}
                                        bgcolor={
                                            status === "To Do"
                                                ? "#D3D3D3"
                                                : status === "In Progress"
                                                ? "#fda63a"
                                                : status === "Done"
                                                ? "#74c365"
                                                : "#f88379"
                                        }
                                        tasks={tasks}
                                        onUpdateTask={handleUpdateTask}
                                        onDeleteTask={handleDeleteTask}
                                    />
                                </DroppableTaskColumn>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </div>
        </DndProvider>
    );
};

export default TaskBoard;
