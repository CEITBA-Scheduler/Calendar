import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';

interface Subject {
  name: string;
  color?: string;
  division?: string;
}

interface WeekDay {
  name: string;
  subjects: Subject[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  weekDays: WeekDay[] = [
    { name: 'Lunes', subjects: [
      { name: 'Algebra' },
      { name: 'Mate 1' },
      { name: 'Fisica' },
      { name: 'PI' }
    ]},
    { name: 'Martes', subjects: [
      { name: 'Algebra' },
      { name: 'Mate 1' },
      { name: 'Fisica' },
      { name: 'PI' }
    ] },
    { name: 'Miercoles', subjects: [
      { name: 'Algebra' },
      { name: 'Mate 1' },
      { name: 'Fisica' },
      { name: 'PI' }
    ] },
    { name: 'Jueves', subjects: [
      { name: 'Algebra' },
      { name: 'Mate 1' },
      { name: 'Fisica' },
      { name: 'PI' }
    ] },
    { name: 'Viernes', subjects: [
      { name: 'Algebra' },
      { name: 'Mate 1' },
      { name: 'Fisica' },
      { name: 'PI' }
    ] }
  ];

  days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
  hours: string[] = [];
  selectedSubjects: Subject[] = [];
  availableSubjects: Subject[] = [
    { name: 'Matematica 1', color: '#123', division: 'Comision 1' },
    { name: 'Algebra', color: '#435332', division: 'Comision 2' },
    { name: 'Fisica', color: '#adc242', division: 'Comision 3' },
    { name: 'PI', color: '#FFaaFF', division: 'Comision 4' },
  ];
  filteredOptions: Subject[] = [];
  subjectChooserValue: string = '';

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    for (let x = 8; x < 22; x++) {
      this.hours.push(`${x}:00`);
    }
  }

  subjectOn(day: string, hour: string): Subject[] {
    return [
      { name: 'Matematica 1', color: '#123', division: 'Catedra 1' }
    ]
  }

  displayFn(subject?: Subject): string | undefined {
    return subject ? subject.name : undefined;
  }

  onSubjectChooserChange() {
    this.filteredOptions = this.availableSubjects.filter(subj => 
      subj.name.toLowerCase().startsWith(this.subjectChooserValue.toLowerCase())
    );
  }

  subjectSelected(event: MatAutocompleteSelectedEvent) {
    const selectedSubject: Subject = event.option.value;
    this.selectedSubjects.push(selectedSubject);
    this.availableSubjects.splice(this.availableSubjects.indexOf(selectedSubject), 1);
    this.subjectChooserValue = "";
    this.onSubjectChooserChange();
    this.cd.detectChanges();
  }

  // Returns a random subject out of the possible 4. Used for testing before the actual subjects are implemented
  randomSubject(): Subject[]  {
    return [this.availableSubjects[Math.floor(Math.random() * 4)]];
  }
}