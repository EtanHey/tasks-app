"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const taskCont_1 = require("../controller/taskCont");
router.get('/getTasks', taskCont_1.getUsersTasks).post('/add-new-task', taskCont_1.addNewTask).patch('/updated-task', taskCont_1.updateTask).post('/task', taskCont_1.getTask).patch('/check-task', taskCont_1.checkTask).delete('/delete-task', taskCont_1.deleteTask).get('/get-urgencies', taskCont_1.getUrgencies);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map