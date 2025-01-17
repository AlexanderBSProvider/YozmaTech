"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const routes_1 = __importDefault(require("./config/routes"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const port = 8080 || process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(cors_1.default({
    origin: 'http://localhost:4200'
}));
app.options('*', cors_1.default());
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map