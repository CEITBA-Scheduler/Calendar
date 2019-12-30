import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
/*
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
*/
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Time } from '@angular/common';

/*
interface WeekDay {
  name: string;
  subjects: Subject[];
}
*/
/* "Dummy" datatypes to simulate obtained data through the algorithm */
interface possibleSchedules {
  weight?: number;          //  Both datatypes won´t be used in current version of the calendar, so they are optional
  priorities?: string[];    //
  subjects: Subject[];
}

interface Subject {
  name: string;
  teachers?: string;        // Same as above
  commissionName: string;
  color: string;
  commissionTimes?: CommissionTime[];
}

interface CommissionTime {
  day?: string;             // Same as above
  location?: string;        //
  initialHour: Time;
  finalHour: Time;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  schedules: possibleSchedules[] = [
    {
      subjects: [
        { name: 'Algebra', color: '#435332', commissionName: 'Comision 2' },
        { name: 'Matematica 1', color: '#123', commissionName: 'Comision 1' },
        { name: 'Fisica', color: '#adc242', commissionName: 'Comision 3' },
        { name: 'PI', color: '#FFaaFF', commissionName: 'Comision 4' }       
      ]
    }
  ]

  days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
  hours: string[] = [];
  
  // Code not used atm
  /* selectedSubjects: Subject[] = [{ name: 'Algebra', color: '#435332', commissionName: 'Comision 2'}];
  availableSubjects: Subject[] = [
    { name: 'Matematica 1', color: '#123', commissionName: 'Comision 1' },
    { name: 'Algebra', color: '#435332', commissionName: 'Comision 2' },
    { name: 'Fisica', color: '#adc242', commissionName: 'Comision 3' },
    { name: 'PI', color: '#FFaaFF', commissionName: 'Comision 4' },
  ];
  */
  filteredOptions: Subject[] = [];
  subjectChooserValue: string = '';
  randomNumbersGenerated: number[] = [];
  checkedStatus = true;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    for (let x = 8; x < 22; x+=0.5) {
      if( x % 2 == 0 || x % 2 == 1)
        this.hours.push(`${x}:00`);
      else
        this.hours.push(`${Math.floor(x)}:30`)
    }
    for (let i = 0; i < 70; i++) {
      this.randomNumbersGenerated.push(Math.floor(Math.random()*4));
    }
  }

  subjectOn(day: string, hour: string): Subject[] {
    return [this.schedules[0].subjects[0]];       // Returnes a subject to plot on the whole calendar. Used for testing  
  }
  
  // Code not used atm
  /*
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
  */
}