import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import TaskBoard from "./components/TaskBoard";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={<PrivateRoute element={<TaskBoard />} />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </DndProvider>
    );
}

export default App;
