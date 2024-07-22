import mysql from 'mysql2/promise';

const dbConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: 'sys',
}

const tableName = 'faq';

export class QuestionsService {

  static async getQuestions() {
    const connection = await mysql.createConnection(dbConfig);
    const [questions] = await connection.execute(`SELECT * FROM ${tableName}`);
    await connection.end();

    return questions;
  }

  static async getQuestion(id: number) {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    return rows;
  }

  static async addQuestion(question: string, answer: string) {
    try {
      const connection = await mysql.createConnection(dbConfig);

      const [rows]: any[] = await connection.execute(
        `SELECT created_at FROM ${tableName} ORDER BY created_at DESC LIMIT 1`
      );

      if (rows.length > 0) {
        const latestQuestionTime = new Date(rows[0].created_at);
        const currentTime = new Date();

        const timeDifference = ((currentTime.getTime() - latestQuestionTime.getTime()) / 1000) / 60;
        if (timeDifference < 1) {
          const error = new Error(`${latestQuestionTime}`);
          throw error;
        }
      }
      
      await connection.execute(`INSERT INTO ${tableName} (question, answer) VALUES(?, ?); `, [question, answer]);

      return await this.getQuestions();
    } catch(error) {
      console.error('Error adding question:', error);
      throw error;
    }

  }

  static async updateQuestion(questionId: number, newQuestion: string, newAnswer: string) {
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(
        `UPDATE ${tableName} SET question = ? WHERE id = ?`,
        [newQuestion, questionId]
      );
      const [result] = await connection.execute(
        `UPDATE ${tableName} SET answer = ? WHERE id = ?`,
        [newAnswer, questionId]
      );
      return result;
    } catch(error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }

  static async updateIsBeingEdited(questionId: number, isBeingEdited: boolean) {
    try {
      const connection = await mysql.createConnection(dbConfig);

      const [result] = await connection.execute(
        `UPDATE ${tableName} SET isBeingEdited = ? WHERE id = ?`,
        [isBeingEdited, questionId]
      );
      const [rows] = await connection.execute(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [questionId]
      );
  
      return rows;
    } catch (error) {
      console.error('Error updating isBeingEdited:', error);
      throw error;
    }
  }

  static async deleteQuestion(questionId: number) {
    try {
      const connection = await mysql.createConnection(dbConfig);

      await connection.execute(
        `DELETE FROM ${tableName} WHERE id = ?`,
        [questionId]
      );

      return await this.getQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error; 
    }
  }

}
