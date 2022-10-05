"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrgencies = exports.getTask = exports.deleteTask = exports.checkTask = exports.updateTask = exports.addNewTask = exports.getUsersTasks = void 0;
const taskModel_1 = __importDefault(require("../model/taskModel"));
const getUsersTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId } = req.query;
    let currentUsersTasks = yield taskModel_1.default.find({ ownerId: ownerId });
    res.send(currentUsersTasks);
});
exports.getUsersTasks = getUsersTasks;
const addNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { color, title, description, urgency, location, date, userId } = req.body;
        if (userId &&
            color &&
            title &&
            description &&
            urgency &&
            location &&
            date) {
            const newTask = new taskModel_1.default({
                color: color,
                title: title,
                description: description,
                urgency: urgency,
                location: location,
                date: date,
                ownerId: userId
            });
            yield newTask.save();
            res.send({
                currentUsersTasks: yield taskModel_1.default.find({ ownerId: userId })
            });
        }
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
});
exports.addNewTask = addNewTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, ownerId, color, title, urgency, description, location, date } = req.body;
        if (_id && ownerId) {
            const updatedTask = yield taskModel_1.default.findOneAndUpdate({ _id: _id, ownerId: ownerId }, {
                color: color,
                title: title,
                urgency: urgency,
                description: description,
                location: location,
                date: date
            });
            const currentUsersTasks = yield taskModel_1.default.find({ ownerId: ownerId });
            res.send({ updatedTask, currentUsersTasks });
        }
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
});
exports.updateTask = updateTask;
const checkTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, ownerId, timeChecked } = req.body;
        const taskCheck = yield taskModel_1.default.findOne({ _id, ownerId });
        if ((taskCheck === null || taskCheck === void 0 ? void 0 : taskCheck.checked) === true) {
            yield taskModel_1.default.updateOne({ _id: _id, ownerId: ownerId }, { timeChecked: timeChecked, checked: false });
            const currentUsersTasks = yield taskModel_1.default.find({ ownerId: ownerId });
            res.send({ currentUsersTasks });
            return;
        }
        const checkTask = yield taskModel_1.default.findOneAndUpdate({ _id: _id, ownerId: ownerId }, { timeChecked: timeChecked, checked: true });
        const currentUsersTasks = yield taskModel_1.default.find({ ownerId: ownerId });
        res.send({ currentUsersTasks });
    }
    catch (error) {
        console.log(error);
        console.log(error.message);
        res.send({ error: error.message });
    }
});
exports.checkTask = checkTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, userURL } = req.body;
        const userId = userURL.split('=')[1];
        const currentPage = userURL.split('/')[3].split('.')[0];
        yield taskModel_1.default.findOneAndDelete({ _id: taskId, ownerId: userId });
        const currentUsersTasks = yield taskModel_1.default.find({ ownerId: userId });
        res.send({ currentUsersTasks, currentPage });
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
});
exports.deleteTask = deleteTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.body;
        const currentTask = yield taskModel_1.default.findOne({ _id: taskId });
        res.send(currentTask);
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
});
exports.getTask = getTask;
const getUrgencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const lowUrgency = yield taskModel_1.default.find({ ownerId: userId, urgency: 'low' });
    const mediumUrgency = yield taskModel_1.default.find({
        ownerId: userId,
        urgency: 'medium'
    });
    const highUrgency = yield taskModel_1.default.find({ ownerId: userId, urgency: 'high' });
    res.send({ lowUrgency, mediumUrgency, highUrgency });
});
exports.getUrgencies = getUrgencies;
//# sourceMappingURL=taskCont.js.map