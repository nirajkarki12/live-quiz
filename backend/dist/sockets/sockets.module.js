"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat/chat.gateway");
const users_module_1 = require("../users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const socket_service_1 = require("./services/socket/socket.service");
const room_schema_1 = require("./schemas/room.schema");
const message_schema_1 = require("./schemas/message.schema");
const questions_module_1 = require("../questions/questions.module");
const quiz_module_1 = require("../quiz/quiz.module");
let SocketsModule = class SocketsModule {
};
SocketsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Room', schema: room_schema_1.RoomSchema },
                { name: 'Message', schema: message_schema_1.MessageSchema },
            ]),
            questions_module_1.QuestionsModule,
            users_module_1.UsersModule,
            quiz_module_1.QuizModule
        ],
        providers: [
            chat_gateway_1.ChatGateway,
            socket_service_1.SocketService,
        ],
    })
], SocketsModule);
exports.SocketsModule = SocketsModule;
//# sourceMappingURL=sockets.module.js.map