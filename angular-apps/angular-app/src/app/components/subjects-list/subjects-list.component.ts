import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
selector: 'app-subjects-list',
templateUrl: './subjects-list.component.html',
styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent implements OnInit {

subjects: any;
currentSubject = null;
currentIndex = -1;
title = '';

constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.retrieveSubjects();
  }

  retrieveSubjects(): void {
    this.subjectService.getAll()
      .subscribe(
        data => {
          this.subjects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveSubjects();
    this.currentSubject = null;
    this.currentIndex = -1;
  }

  setActiveSubject(subject, index): void {
    this.currentSubject = subject;
    this.currentIndex = index;
  }

  removeAllSubjects(): void {
    this.subjectService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveSubjects();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.subjectService.findByTitle(this.title)
      .subscribe(
        data => {
          this.subjects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
