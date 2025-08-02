"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUserStatus = exports.IUserRole = void 0;
var IUserRole;
(function (IUserRole) {
    IUserRole["Admin"] = "Admin";
    IUserRole["Sender"] = "Sender";
    IUserRole["Receiver"] = "Receiver";
})(IUserRole || (exports.IUserRole = IUserRole = {}));
var IUserStatus;
(function (IUserStatus) {
    IUserStatus["Active"] = "Active";
    IUserStatus["Blocked"] = "Blocked";
})(IUserStatus || (exports.IUserStatus = IUserStatus = {}));
