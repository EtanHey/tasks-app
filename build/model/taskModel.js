"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    urgency: String,
    location: String,
    date: Date,
    color: String,
    ownerId: String,
    checked: Boolean,
    timeChecked: String
});
const task = mongoose_1.default.model('tasks', TaskSchema);
exports.default = task;
//# sourceMappingURL=taskModel.js.map