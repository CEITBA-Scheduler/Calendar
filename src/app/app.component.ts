import { Observable, BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { Subject } from './materia';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'DDCalendar';
  subjects: Observable <Subject[]>; // objeto solo observable (solo lectura)
  subjectsBehaviourSubject: BehaviorSubject<Subject[]> = new BehaviorSubject([]); // objeto observable y modificable (lectura y escritura)

  ngOnInit(){
    this.subjects = this.subjectsBehaviourSubject.asObservable();
  }

  updateSubjects(newSubjects: Subject[]){
    this.subjectsBehaviourSubject.next(newSubjects); // actualizamos las materias
  }
}
