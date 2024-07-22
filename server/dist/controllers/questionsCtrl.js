"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questionsService_1 = require("../services/questionsService");
const QuestionsCtrl = {
    list: (req, res) => {
        questionsService_1.QuestionsService.getQuestions()
            .then(result => {
            res.status(200).send(result);
        })
            .catch(e => {
            console.error('Failed to fetch questions', e);
            res.status(500).send();
        });
    },
    get: (req, res) => {
        const { id } = req.params;
        questionsService_1.QuestionsService.getQuestion(+id)
            .then(result => {
            res.status(200).send(result);
        })
            .catch(e => {
            console.error('Failed to fetch questions', e);
            res.status(500).send();
        });
    },
    add: (req, res) => {
        const { question, answer } = req.body;
        questionsService_1.QuestionsService.addQuestion(question, answer)
            .then(result => {
            res.status(200).send(result);
        })
            .catch(e => {
            console.error('Failed to fetch questions', e);
            res.status(500).send();
        });
    },
    updateQuestion: (req, res) => {
        const { id, newQuestion, newAnswer } = req.body;
        questionsService_1.QuestionsService.updateQuestion(id, newQuestion, newAnswer)
            .then(result => {
            res.status(200).send(result);
        })
            .catch(e => {
            console.error('Failed to fetch questions', e);
            res.status(500).send();
        });
    },
    updateIsBeingEdited: (req, res) => {
        const { questionId, isBeingEdited } = req.body;
        questionsService_1.QuestionsService.updateIsBeingEdited(questionId, isBeingEdited)
            .then(result => {
            res.status(200).send(result);
        })
            .catch(e => {
            console.error('Failed to fetch questions', e);
            res.status(500).send();
        });
    },
    deleteQuestion: (req, res) => {
        const { id } = req.params;
        questionsService_1.QuestionsService.deleteQuestion(+id)
            .then(result => {
            res.status(200).send(result);
        })
            .catch(e => {
            console.error('Failed to fetch questions', e);
            res.status(500).send();
        });
    },
};
exports.default = QuestionsCtrl;
//# sourceMappingURL=questionsCtrl.js.map