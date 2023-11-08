"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const coupleSchema = new mongoose_1.default.Schema({
    level: {
        type: Number,
        default: 1,
    },
    wordphrase: {
        type: String,
    },
    translation: {
        type: String,
    },
    date: {
        type: Date,
    }
});
exports.default = mongoose_1.default.model("Couple", coupleSchema);
