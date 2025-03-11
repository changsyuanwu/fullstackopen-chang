"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEntrySchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
exports.newEntrySchema = zod_1.z.object({
    weather: zod_1.z.nativeEnum(types_1.Weather),
    visibility: zod_1.z.nativeEnum(types_1.Visibility),
    date: zod_1.z.string().date(),
    comment: zod_1.z.string().optional(),
});
