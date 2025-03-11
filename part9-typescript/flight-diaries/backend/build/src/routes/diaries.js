"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const diaryService_1 = __importDefault(require("../services/diaryService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(diaryService_1.default.getNonSensitiveEntries());
});
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const entry = diaryService_1.default.findEntryById(id);
    if (entry) {
        res.send(entry);
    }
    else {
        res.sendStatus(404);
    }
});
const newDiaryParser = (req, _res, next) => {
    try {
        utils_1.newEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
router.post('/', newDiaryParser, (req, res) => {
    const addedEntry = diaryService_1.default.addDiary(req.body);
    res.json(addedEntry);
});
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.use(errorMiddleware);
exports.default = router;
