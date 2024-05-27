import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done"],
        default: "To Do",
    },
    assignee: {
        type: String,
    },
    team: {
        type: String,
    },
    priority: {
        type: String,
        enum: ["P0", "P1", "P2"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default model("Task", TaskSchema);
