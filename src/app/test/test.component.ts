import { Subject } from './../materia';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

/*
Se llama test pero es test-input
*/

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() shownSubjects: Observable<Subject[]>;

  constructor() { }

  ngOnInit() {
    this.shownSubjects.subscribe((subjects: Subject[]) => {
      console.log("¡Subjects ha cambiado!");
      console.log("El nuevo valor es: ");
      console.log(subjects);
    });

  }
}
