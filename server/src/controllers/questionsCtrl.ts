import {Request, Response} from 'express';
import {QuestionsService} from '../services/questionsService';

const QuestionsCtrl = {

  list: (req: Request, res: Response) => {
    QuestionsService.getQuestions()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.error('Failed to fetch questions', e);
        res.status(500).send();
    });

  },

  get:(req: Request, res: Response) => {
    const { id }  = req.params;

    QuestionsService.getQuestion(+id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.error('Failed to fetch questions', e);
        res.status(500).send();
    });

  },

  add: (req: Request, res: Response) => {
    const { question, answer } = req.body;

    QuestionsService.addQuestion(question, answer)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.error('Failed to fetch questions', e);
        res.status(500).send();
      });

  },

  updateQuestion: (req: Request, res: Response) => {
    const { id, newQuestion, newAnswer } = req.body;

    QuestionsService.updateQuestion(id, newQuestion, newAnswer)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.error('Failed to fetch questions', e);
        res.status(500).send();
      });

  },


  updateIsBeingEdited: (req: Request, res: Response) => {
    const { questionId, isBeingEdited } = req.body;

    QuestionsService.updateIsBeingEdited(questionId, isBeingEdited)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.error('Failed to fetch questions', e);
        res.status(500).send();
      });

  },

  deleteQuestion: (req: Request, res: Response) => {
    const { id }  = req.params;

    QuestionsService.deleteQuestion(+id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        console.error('Failed to fetch questions', e);
        res.status(500).send();
      });

  },
};

export default QuestionsCtrl;