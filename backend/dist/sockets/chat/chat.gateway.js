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
var _a, _b;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const ws_jwt_guard_1 = require("../guards/ws-jwt.guard");
let ChatGateway = class ChatGateway {
    constructor() {
        this.nicknames = new Map();
    }
    handleConnection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            client.emit('users', 'connected ' + client);
        });
    }
    handleDisconnect(client) {
        client.server.emit('users-changed', { user: this.nicknames[client.id], event: 'left' });
        this.nicknames.delete(client.id);
    }
    setNickname(client, nickname) {
        this.nicknames[client.id] = nickname;
        client.server.emit('users-changed', { user: nickname, event: 'joined' });
    }
    addMessage(client, message) {
        client.server.emit('message', { text: message.text, from: this.nicknames[client.id], created: new Date() });
    }
};
__decorate([
    common_1.UseGuards(ws_jwt_guard_1.WsJwtGuard),
    websockets_1.SubscribeMessage('set-nickname'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _a : Object, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "setNickname", null);
__decorate([
    common_1.UseGuards(ws_jwt_guard_1.WsJwtGuard),
    websockets_1.SubscribeMessage('add-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "addMessage", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway()
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map