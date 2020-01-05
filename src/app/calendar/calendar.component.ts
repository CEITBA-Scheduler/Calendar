import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
/*
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
*/
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Time } from '@angular/common';


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

  // Contains the subjects/comissions displayed on the current calendar. NOTE: Using Object.assign bc = results in a dynamic = instead of a one timer
  selectedSchedule: Subject[] = Object.assign([], this.schedules[0].subjects);
  // Contains the subject list displayed on the lateral bar
  subjectList: SubjectList[] = [];
  // Used to plot subjects when in between initialHour and finalHour on subjectOn()
  currentSubjectIndex: number = this.schedules[0].subjects.length + 1;

  days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
  hours: string[] = [];
  filteredOptions: Subject[] = [];
  subjectChooserValue: string = '';
  selectedStatus: boolean = true;

  constructor(private cd: ChangeDetectorRef) { }

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
    for (m = 0 ; m < this.selectedSchedule.length; m++) {
      if (day === this.selectedSchedule[m].commissionTimes.day) {
        if (hour === this.hourToString(this.selectedSchedule[m].commissionTimes.initialHour.hours, this.selectedSchedule[m].commissionTimes.initialHour.minutes)) {
          subject = [this.selectedSchedule[m]];
          this.currentSubjectIndex = m;
          break;
        }
        else if (hour === this.hourToString(this.selectedSchedule[m].commissionTimes.finalHour.hours, this.selectedSchedule[m].commissionTimes.finalHour.minutes)) {
          subject = [{ name:"", color:"", commissionName:""}];
          this.currentSubjectIndex = this.schedules[0].subjects.length + 1; // So that no subject have an index equal to currentSubjectIndex
          break;
        }
        else if (m === this.currentSubjectIndex) {
          subject = [this.selectedSchedule[m]];
          break;
        }
      }
    }
    if (m >= this.selectedSchedule.length)          // >= used instead of == bc they do the same except when a bug makes m greater than expected
      subject = [{ name:"", color:"", commissionName:""}];
    return subject;
  }

  hourToString (hour: number, minutes: number): String {
    if (minutes.toString() !== "0")
      return hour.toString() + ":" + minutes.toString();
    else
      return hour.toString() + ":" + minutes.toString() + "0";
  }

  switchSubjectState (subj: SubjectList) {
    if (!subj.checked) {
      for (let i = 0 ; i < this.selectedSchedule.length ; i++) {
        // Tried comparing each object instead of each object.field but didn´t work, so went with the latter
        if (subj.subject.name === this.selectedSchedule[i].name
        && subj.subject.color === this.selectedSchedule[i].color
        && subj.subject.commissionName === this.selectedSchedule[i].commissionName
        && subj.subject.commissionTimes === this.selectedSchedule[i].commissionTimes
        && subj.subject.teachers === this.selectedSchedule[i].teachers ) {
          this.selectedSchedule.splice(i, 1);
          console.log(subj.subject.name + " removed on position " + i);
          break;
        }
      }
    }
    else
      this.selectedSchedule.push(subj.subject);
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