import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QnaService } from './qna.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'qna'
  questions$: Observable<any>

  form = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required)
  })
  isBeingEdited = false

  currentId: number

  constructor(private qnaService: QnaService) {}
  
  ngOnInit(): void {
    this.questions$ = this.qnaService.getAllQuestions('questions')
  }

  onSubmit(){
    console.log('here')
    if (!this.form.valid) return
    this.questions$ = this.qnaService.addQuestion('addQuestion',this.form.value)
  }

  deleteQuestion(id: number) {
    this.questions$ =  this.qnaService.deleteQuestion('deleteQuestion', id)
  }

  saveQuestion() {
    if (!this.form.valid) return
    const body = {
      id: this.currentId,
      newQuestion: this.form.controls['question'].value,
      newAnswer: this.form.controls['answer'].value
    }
    this.qnaService.saveQuestion('updateQuestion', body).subscribe(() =>  {
      this.questions$ = this.qnaService.getAllQuestions('questions')
      this.isBeingEdited = false
    })

    this.qnaService.setIsBeingEdited('updateIsBeingEdited', {questionId: this.currentId, isBeingEdited: false}).subscribe(() => {
      this.form.controls['question'].patchValue('')
      this.form.controls['answer'].patchValue('')
    })
  }

  editQuestion(id: number) {
    this.qnaService.getQuestion('question', id).pipe(
      switchMap((question) => {
        console.log('question', question)
        if (question[0]?.isBeingEdited === 0) {
          return this.qnaService.setIsBeingEdited('updateIsBeingEdited', {questionId: id, isBeingEdited: true})
        } else {
          return EMPTY
        }
      })
    ).subscribe((res) => {
      if (!res[0]) return
      const {question, answer, id} = res[0] as {question: string, answer: string, id: number}
      this.form.controls['question'].patchValue(question)
      this.form.controls['answer'].patchValue(answer)
      this.isBeingEdited = true
      this.currentId = id
    })
  }

  onCancel() {
    this.form.controls['question'].patchValue('')
    this.form.controls['answer'].patchValue('')
    this.isBeingEdited = false
  }
}
