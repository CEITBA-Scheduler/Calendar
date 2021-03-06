import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
/*
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
*/
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Time } from '@angular/common';
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
  commissionTimes?: CommissionTime;
}

interface CommissionTime {
  day: string;
  location?: string;       // Same as above
  initialHour: Time | null;
  finalHour: Time | null;
}

// Uses to list data on the lateral bar (needed checked as extra property so each subject has its own functional checkbox)
interface SubjectList {
  checked: boolean;
  subject: Subject;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {

  }

  schedules: possibleSchedules[] = [
    {
      subjects: [
        { name: 'Algebra', color: '#00fff7', commissionName: 'Comision 2',
        commissionTimes: { day: "Lunes", initialHour: { hours:14, minutes:30 }, finalHour: { hours:18, minutes:30 }}},
        { name: 'Matematica 1', color: '#f9ff33', commissionName: 'Comision 1',
        commissionTimes: { day: "Martes", initialHour: { hours:9, minutes:0 }, finalHour: { hours:11, minutes:0 }}},
        { name: 'PI', color: '#0051ff', commissionName: 'Comision 4',
        commissionTimes: { day: "Miercoles", initialHour: { hours:10, minutes:30 }, finalHour: { hours:14, minutes:0 }}},
        { name: 'Fisica', color: '#00ff13', commissionName: 'Comision 3',
        commissionTimes: { day: "Viernes", initialHour: { hours:13, minutes:0 }, finalHour: { hours:16, minutes:30 }}}
      ]
    }
  ]

  // Contains the subject list displayed on the lateral bar. Subjects are shown on the calendar depending on its checkbox status
  subjectList: SubjectList[] = [];
  // Used to plot subjects when in between initialHour and finalHour on subjectOn()
  currentSubjectIndex: number = -1;
  // Contains all the subjects that can be taken minus the ones that have already been plotted. Using Logica as dummy datatype atm
  availableSubjects: Subject[] = 
  [{ name: "Logica", color:"#FF8921", commissionName:"Comision 1", 
  commissionTimes: { day: "Jueves", initialHour: {hours:8, minutes:0}, finalHour: {hours: 11, minutes: 30} } }];

  days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  hours: string[] = [];
  filteredOptions: Subject[] = [];
  subjectChooserValue: string = '';
  selectedStatus: boolean = true;
  subjectChooserDisabled: boolean = false;

  ngOnInit() {
    for (let x = 8; x < 22; x+=0.5) {
      if (x % 2 === 0 || x % 2 === 1)
        this.hours.push(`${x}:00`);
      else
        this.hours.push(`${Math.floor(x)}:30`);
    }
    for (let i = 0; i < this.schedules[0].subjects.length ; i++ ) {
      this.subjectList.push( {checked: true, subject: Object.assign({}, this.schedules[0].subjects[i])} );
    }
  }

  // Checks if there's a subject on the day and hour sent
  subjectOn (day: string, hour: string): Subject[] {
  var subject : Subject[];
  var m: number;
  for (m = 0 ; m < this.subjectList.length; m++) {
    if (day === this.subjectList[m].subject.commissionTimes.day) {
      if (hour === this.hourToString(this.subjectList[m].subject.commissionTimes.initialHour.hours, this.subjectList[m].subject.commissionTimes.initialHour.minutes) && this.subjectList[m].checked) {
        subject = [this.subjectList[m].subject];
        this.currentSubjectIndex = m;
        break;
      }
      else if (hour === this.hourToString(this.subjectList[m].subject.commissionTimes.finalHour.hours, this.subjectList[m].subject.commissionTimes.finalHour.minutes) && this.subjectList[m].checked) {
        subject = [{ name:"", color:"", commissionName:""}];
        this.currentSubjectIndex = -1; // So that no subject have an index equal to currentSubjectIndex
        break;
      }
      else if (m === this.currentSubjectIndex && this.subjectList[m].checked) {
        subject = [this.subjectList[m].subject];
        break;
      }
    }
  }
  if (m >= this.subjectList.length)          // >= used instead of == bc they do the same except when a bug makes m greater than expected
    subject = [{ name:"", color:"", commissionName:""}];
  return subject;
}

  hourToString (hour: number, minutes: number): String {
    if (minutes.toString() !== "0")
      return hour.toString() + ":" + minutes.toString();
    else
      return hour.toString() + ":" + minutes.toString() + "0";
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
    this.subjectList.push( {checked: true, subject: Object.assign({}, selectedSubject)} );
    this.availableSubjects.splice(this.availableSubjects.indexOf(selectedSubject), 1);
    console.log(this.availableSubjects.length);
    this.subjectChooserValue = "";
    this.onSubjectChooserChange();
    if (this.availableSubjects.length == 0) 
      this.subjectChooserDisabled = true;
    this.cd.detectChanges();
  }

  deleteComissionFromList(subj: Subject) {
    for (let i = 0 ; i < this.subjectList.length ; i++) {
      if (this.subjectsAreEqual(subj, this.subjectList[i].subject)) {
        this.subjectList.splice(i, 1);
        this.availableSubjects.push(subj);
      }
    }
    this.subjectChooserDisabled = false;
  }

  subjectsAreEqual(subj1: Subject, subj2: Subject): boolean {
    if ( subj1.name === subj2.name
      && subj1.color === subj2.color
      && subj1.commissionName === subj2.commissionName
      && subj1.commissionTimes === subj2.commissionTimes
      && subj1.teachers === subj2.teachers )
      return true;
    else
      return false;
  }

}
