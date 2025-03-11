"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diaryEntries_1 = __importDefault(require("../../data/diaryEntries"));
const getEntries = () => {
    return diaryEntries_1.default;
};
const findEntryById = (id) => {
    return diaryEntries_1.default.find((d) => d.id === id);
};
const getNonSensitiveEntries = () => {
    return diaryEntries_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const addDiary = (entry) => {
    const newDiaryEntry = Object.assign({ id: Math.max(...diaryEntries_1.default.map((d) => d.id)) + 1 }, entry);
    diaryEntries_1.default.push(newDiaryEntry);
    return newDiaryEntry;
};
exports.default = {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findEntryById,
};
