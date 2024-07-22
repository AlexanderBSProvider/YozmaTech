import express from 'express';
import QuestionsCtrl from '../controllers/questionsCtrl';
import cors from 'cors';

const router = express.Router();

router.get('/questions', cors(), QuestionsCtrl.list);
router.get('/question/:id', cors(), QuestionsCtrl.get);

router.post('/addQuestion', cors(), QuestionsCtrl.add);
router.put('/updateQuestion', cors(), QuestionsCtrl.updateQuestion);
router.patch('/updateIsBeingEdited', cors(), QuestionsCtrl.updateIsBeingEdited);
router.delete('/deleteQuestion/:id', cors(), QuestionsCtrl.deleteQuestion);

export default router;
