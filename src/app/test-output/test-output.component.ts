import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from '../materia';

@Component({
  selector: 'app-test-output',
  templateUrl: './test-output.component.html',
  styleUrls: ['./test-output.component.css']
})
export class TestOutputComponent implements OnInit {

  @Output() subjectsOutput: EventEmitter<Subject[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // emitimos dos materias para probar
    this.subjectsOutput.emit(
      [{name: "Materia 1", code: "22.04"},
      {name: "Materia 2", code: "22.05"}
    ]);
    // emitimos otras dos materias para probar
    this.subjectsOutput.emit(
      [{name: "Materia 3", code: "22.06"},
      {name: "Materia 4", code: "22.07"}
    ]);

  }

}
