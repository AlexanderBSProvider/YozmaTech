import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "./enviroment";

@Injectable({
  providedIn: 'root'
})
export class QnaService {
	constructor(private http: HttpClient) {}

    getQuestion(route: string, id: number ) {
        return this.http.get(environment.url + route + '/' + id);
    }

	getAllQuestions(route: string) {
		return this.http.get(environment.url + route);
	}

	addQuestion(route: string, body: { question: string, answer: string}) {
		return this.http.post(environment.url + route, body);
	}

    deleteQuestion(route: string, id: number) {
		return this.http.delete(environment.url + route + '/' + id);
	}

	saveQuestion(route: string, body: { newQuestion: string, newAnswer: string, id: number}) {
		return this.http.put(environment.url + route, body);
	}

	setIsBeingEdited(route: string, body: {questionId: number, isBeingEdited: boolean} ) {
		return this.http.patch(environment.url + route, body);
	}
}
