"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dbConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: 'sys',
};
const tableName = 'faq';
class QuestionsService {
    static getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield promise_1.default.createConnection(dbConfig);
            const [questions] = yield connection.execute(`SELECT * FROM ${tableName}`);
            yield connection.end();
            return questions;
        });
    }
    static getQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield promise_1.default.createConnection(dbConfig);
            const [rows] = yield connection.execute(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
            return rows;
        });
    }
    static addQuestion(question, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield promise_1.default.createConnection(dbConfig);
                const [rows] = yield connection.execute(`SELECT created_at FROM ${tableName} ORDER BY created_at DESC LIMIT 1`);
                if (rows.length > 0) {
                    const latestQuestionTime = new Date(rows[0].created_at);
                    const currentTime = new Date();
                    const timeDifference = ((currentTime.getTime() - latestQuestionTime.getTime()) / 1000) / 60;
                    if (timeDifference < 1) {
                        const error = new Error(`${latestQuestionTime}`);
                        throw error;
                    }
                }
                yield connection.execute(`INSERT INTO ${tableName} (question, answer) VALUES(?, ?); `, [question, answer]);
                return yield this.getQuestions();
            }
            catch (error) {
                console.error('Error adding question:', error);
                throw error;
            }
        });
    }
    static updateQuestion(questionId, newQuestion, newAnswer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield promise_1.default.createConnection(dbConfig);
                yield connection.execute(`UPDATE ${tableName} SET question = ? WHERE id = ?`, [newQuestion, questionId]);
                const [result] = yield connection.execute(`UPDATE ${tableName} SET answer = ? WHERE id = ?`, [newAnswer, questionId]);
                return result;
            }
            catch (error) {
                console.error('Error updating question:', error);
                throw error;
            }
        });
    }
    static updateIsBeingEdited(questionId, isBeingEdited) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield promise_1.default.createConnection(dbConfig);
                const [result] = yield connection.execute(`UPDATE ${tableName} SET isBeingEdited = ? WHERE id = ?`, [isBeingEdited, questionId]);
                const [rows] = yield connection.execute(`SELECT * FROM ${tableName} WHERE id = ?`, [questionId]);
                return rows;
            }
            catch (error) {
                console.error('Error updating isBeingEdited:', error);
                throw error;
            }
        });
    }
    static deleteQuestion(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield promise_1.default.createConnection(dbConfig);
                yield connection.execute(`DELETE FROM ${tableName} WHERE id = ?`, [questionId]);
                return yield this.getQuestions();
            }
            catch (error) {
                console.error('Error deleting question:', error);
                throw error;
            }
        });
    }
}
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questionsService.js.map