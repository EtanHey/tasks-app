"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userCont_1 = require("../controller/userCont");
router
    .post('/add-user', userCont_1.addUser)
    .post('/log-in', userCont_1.login)
    .get(`/logged-in-user`, userCont_1.renderUser)
    .post('/nav', userCont_1.renderPage)
    .patch('/settings', userCont_1.updateUser);
// .post('/passwordCheck', passwordCheck)
exports.default = router;
//# sourceMappingURL=userRoutes.js.map