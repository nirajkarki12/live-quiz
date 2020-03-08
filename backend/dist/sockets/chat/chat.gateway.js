"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d, _e, _f;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const socket_io_1 = require("socket.io");
const ws_jwt_guard_1 = require("../../sockets/guards/ws-jwt.guard");
const socket_service_1 = require("../services/socket/socket.service");
const users_service_1 = require("../../users/services/users.service");
const question_service_1 = require("../../questions/services/question/question.service");
const quiz_service_1 = require("../../quiz/services/quiz.service");
let ChatGateway = class ChatGateway {
    constructor(socketService, userService, questionService, quizService) {
        this.socketService = socketService;
        this.userService = userService;
        this.questionService = questionService;
        this.quizService = quizService;
        this.connectedUsers = 0;
        this.quizStarted = false;
    }
    handleConnection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = client.handshake.query.token;
                const user = jwt.decode(token);
                if (!user)
                    throw new websockets_1.WsException('Can\'t Connect to network');
                const userName = user.name;
                this.room = yield this.socketService.findRoomByName('public');
                if (!this.room) {
                    this.room = yield this.socketService.createRoom('public');
                }
                this.connectedUsers++;
                client.join(this.room.name);
                const messages = yield this.socketService.findMessages(this.room.id, 40);
                client.emit(this.room.name).emit('pre-messages', messages);
                this.server.to(this.room.name).emit('totalUsers', this.connectedUsers);
                client.to(this.room.name).emit('users-changed', { text: userName + ' Joined a public room', event: 'joined' });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    handleDisconnect(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = client.handshake.query.token;
                const user = jwt.decode(token);
                const userName = user.name;
                if (!user)
                    throw new websockets_1.WsException('Can\'t Connect to network');
                this.connectedUsers--;
                this.server.to(this.room.name).emit('totalUsers', this.connectedUsers);
                client.to(this.room.name).emit('users-changed', { text: userName + ' left public room', event: 'left', viewOnly: true });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    addMessage(client, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = client.handshake.query.token;
            const user = jwt.decode(token);
            let roomMessage = yield this.socketService.addMessage(message, user, this.room.id);
            yield this.server.to(this.room.name).emit('message', roomMessage);
        });
    }
    quizEvent(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = client.handshake.query.token;
            const user = jwt.decode(token);
            if (data.set) {
                yield this.server.to(this.room.name).emit('quiz-started', { currentTime: new Date() });
            }
            else if (data.question) {
                let question = data.question;
                yield this.server.to(this.room.name).emit('quiz-question', { question: question, timer: 10000 });
            }
            else {
                this.quizStarted = false;
            }
        });
    }
    quizAnswer(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = client.handshake.query.token;
            const user = jwt.decode(token);
            let question = yield this.questionService.findOneById(data.id);
            let userObj = yield this.userService.findOneByUserId(user.userId);
            let isCorrect = false;
            if (data.option === question.answer)
                isCorrect = true;
            yield this.quizService.create({
                user: userObj,
                question: question,
                input: data.option,
                isCorrect: isCorrect
            });
            if (!isCorrect)
                yield this.server.to(client.id).emit('view-only', { viewOnly: true });
        });
    }
    questionResult(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const questionResult = yield this.quizService.getQuizResults(data.question);
            yield this.server.to(this.room.name).emit('question-result', { question: questionResult });
        });
    }
    quizEnded(client, set) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.quizService.getFinalResults(set);
            yield this.server.to(this.room.name).emit('quiz-final-result', result);
        });
    }
    quizTimeOut(client, questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = client.handshake.query.token;
            const user = jwt.decode(token);
            let question = yield this.questionService.findOneById(questionId);
            let userObj = yield this.userService.findOneByUserId(user.userId);
            if (!question)
                throw new websockets_1.WsException('Question not found');
            yield this.server.to(client.id).emit('view-only', { viewOnly: true });
            yield this.quizService.create({
                user: userObj,
                question: question,
                isTimeout: true
            });
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    common_1.UseGuards(ws_jwt_guard_1.WsJwtGuard),
    websockets_1.SubscribeMessage('add-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _a : Object, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "addMessage", null);
__decorate([
    common_1.UseGuards(ws_jwt_guard_1.WsJwtGuard),
    websockets_1.SubscribeMessage('quizEvent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "quizEvent", null);
__decorate([
    common_1.UseGuards(ws_jwt_guard_1.WsJwtGuard),
    websockets_1.SubscribeMessage('quiz-option'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "quizAnswer", null);
__decorate([
    common_1.UseGuards(ws_jwt_guard_1.WsJwtGuard),
    websockets_1.SubscribeMessage('result-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "questionResult", null);
__decorate([
    common_1.UseGuards(ws_jwt_guard_1.WsJwtGuard),
    websockets_1.SubscribeMessage('quiz-ended'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "quizEnded", null);
__decorate([
    common_1.UseGuards(ws_jwt_guard_1.WsJwtGuard),
    websockets_1.SubscribeMessage('quiz-timeout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "quizTimeOut", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [socket_service_1.SocketService,
        users_service_1.UsersService,
        question_service_1.QuestionService,
        quiz_service_1.QuizService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map