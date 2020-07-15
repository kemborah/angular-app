import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
selector: 'app-add-subject',
templateUrl: './add-subject.component.html',
styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
subject = {
title: '',
description: '',
published: false
};
submitted = false;

constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  saveSubject(): void {
    const data = {
      title: this.subject.title,
      description: this.subject.description
    };

    this.subjectService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newSubject(): void {
    this.submitted = false;
    this.subject = {
      title: '',
      description: '',
      published: false
    };
  }

}
