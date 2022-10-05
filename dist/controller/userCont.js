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
exports.updateUser = exports.passwordCheck = exports.renderPage = exports.renderUser = exports.login = exports.addUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const secret = process.env.JWT_SECRET;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { firstName, lastName, email, password, role, gender } = req.body;
        if (firstName && lastName && email && password && role && gender) {
            const aUser = yield userModel_1.default.findOne({ email: email });
            if (!aUser) {
                const newUser = new userModel_1.default({
                    firstName,
                    lastName,
                    email,
                    password,
                    role,
                    gender
                });
                const result = yield newUser.save();
                res.send({ result });
                return;
            }
            res.send({ aUser });
        }
        else
            throw new Error(`You've missed something`);
    }
    catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
});
exports.addUser = addUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    try {
        const currentLogin = yield userModel_1.default.findOne({ email: email }).collation({ locale: 'en_US', strength: 1 });
        if (currentLogin) {
            const userEmail = yield currentLogin.email;
            const userVerification = yield userModel_1.default.findOne({
                email: userEmail,
                password: password
            });
            if (userVerification) {
                const verifiedUser = yield userModel_1.default.find({
                    email: userEmail,
                    password: password
                });
                if (verifiedUser.length === 1) {
                    const userId = userVerification._id.toString();
                    const userRole = userVerification.role;
                    const payload = { userId, userRole };
                    const information = jwt_simple_1.default.encode(payload, secret);
                    res.cookie('currentUser', information, {});
                    res.send({ ok: true, currentLogin, verifiedUser, userId });
                    return;
                }
                res.send({ aUser: true });
                return;
            }
            res.send({ aUser: true });
        }
        else {
            res.send({ aUser: false });
        }
    }
    catch (error) {
        console.log('error in login:');
        console.log(error.message);
        res.send({ error: error.message });
    }
});
exports.login = login;
const renderUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentUser } = req.cookies;
    const decoded = jwt_simple_1.default.decode(currentUser, secret);
    const { userId, userRole } = decoded;
    const userInfo = yield userModel_1.default.find({ _id: userId });
    res.send({ userInfo: userInfo, decoded });
});
exports.renderUser = renderUser;
const renderPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userURL, requestedPage } = req.body;
    const appURL = userURL.split('/')[2];
    const userId = userURL.slice(-24);
    const currentUser = yield userModel_1.default.find({ _id: userId });
    const newURL = `/${requestedPage}.html?id=${userId}`;
    let { firstName, lastName, gender, role, email, password } = currentUser[0];
    if (requestedPage === 'home') {
        try {
            res.send({
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                role: role,
                newURL: newURL
            });
        }
        catch (error) {
            console.log('error in renderPage: home');
            console.log(error.message);
            res.send({ error: error.message });
            // }
        }
        return;
    }
    if (requestedPage === 'settings') {
        try {
            res.send({
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                role: role,
                email: email,
                password: password,
                newURL: newURL
            });
        }
        catch (error) {
            console.log('error in renderPage: settings');
            console.log(error.message);
            res.send({ error: error.message });
            // }
        }
        return;
    }
    if (requestedPage === 'info') {
        try {
            res.send({
                newURL: newURL
            });
        }
        catch (error) {
            console.log('error in renderPage: info');
            console.log(error.message);
            res.send({ error: error.message });
            // }
        }
        return;
    }
    if (requestedPage === 'RecentlyCreated') {
        try {
            res.send({
                newURL: newURL
            });
        }
        catch (error) {
            console.log('error in renderPage: RecentlyCreated');
            console.log(error.message);
            res.send({ error: error.message });
            // }
        }
        return;
    }
});
exports.renderPage = renderPage;
const passwordCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, userId } = req.body;
        const isRightPassword = yield userModel_1.default.find({
            _id: userId,
            password: password
        });
        res.send({ isRightPassword });
    }
    catch (error) {
        console.log('error in renderPage: RecentlyCreated');
        console.log(error.message);
        res.send({ error: error.message });
    }
});
exports.passwordCheck = passwordCheck;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstNameUpdate, lastNameUpdate, emailUpdate, genderUpdate, roleUpdate, passwordUpdate, passwordConfirmation, userId } = req.body;
        const updateUser = yield userModel_1.default.updateOne({ _id: userId, password: passwordConfirmation }, {
            firstName: firstNameUpdate,
            lastName: lastNameUpdate,
            email: emailUpdate,
            gender: genderUpdate,
            role: roleUpdate,
            password: passwordUpdate
        });
        const updateStatus = yield updateUser.matchedCount;
        if (updateStatus === 1) {
            const updatedUser = yield userModel_1.default.find({ _id: userId });
            res.send({ updatedUser: updatedUser });
            return;
        }
        if (updateStatus === 0) {
            res.send({ updateStatus: updateStatus });
        }
    }
    catch (error) {
        console.log('error in updateUser');
        console.log(error.message);
        res.send({ error: error.message });
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=userCont.js.map