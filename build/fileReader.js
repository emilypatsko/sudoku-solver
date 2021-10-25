"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileReader = void 0;
const fs_1 = __importDefault(require("fs"));
exports.FileReader = {
    readFile: function (path) {
        return fs_1.default.readFileSync(path, "utf8");
    }
};
exports.default = exports.FileReader;
