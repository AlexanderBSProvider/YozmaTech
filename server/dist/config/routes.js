"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionsCtrl_1 = __importDefault(require("../controllers/questionsCtrl"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
router.get('/questions', cors_1.default(), questionsCtrl_1.default.list);
router.get('/question/:id', cors_1.default(), questionsCtrl_1.default.get);
router.post('/addQuestion', cors_1.default(), questionsCtrl_1.default.add);
router.put('/updateQuestion', cors_1.default(), questionsCtrl_1.default.updateQuestion);
router.patch('/updateIsBeingEdited', cors_1.default(), questionsCtrl_1.default.updateIsBeingEdited);
router.delete('/deleteQuestion/:id', cors_1.default(), questionsCtrl_1.default.deleteQuestion);
exports.default = router;
//# sourceMappingURL=routes.js.map