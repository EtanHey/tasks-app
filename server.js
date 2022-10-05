"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
app.use(cookie_parser_1.default());
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log('connected to Mongoose');
})
    .catch((err) => {
    console.log('Failed to connect to Mongoose:');
    console.log(err.message);
});
// app.post('/show-user'), async (req, res) => {
// }
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.use('/users', userRoutes_1.default);
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
app.use('/tasks', taskRoutes_1.default);
app.listen(port, () => {
    return console.log(`Server is listening at http://localhost:${port}`);
});
