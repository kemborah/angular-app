import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
selector: 'app-subject-details',
templateUrl: './subject-details.component.html',
styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {
currentSubject = null;
message = '';

constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getSubject(this.route.snapshot.paramMap.get('id'));
  }

  getSubject(id): void {
    this.subjectService.get(id)
      .subscribe(
        data => {
          this.currentSubject = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentSubject.title,
      description: this.currentSubject.description,
      published: status
    };

    this.subjectService.update(this.currentSubject.id, data)
      .subscribe(
        response => {
          this.currentSubject.published = status;
          console.log(response);
          this.message = "This subject was ";
          this.message += status ? "published.":"unpublished."
        },
        error => {
          console.log(error);
        });
  }

  updateSubject(): void {
    this.subjectService.update(this.currentSubject.id, this.currentSubject)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The subject was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteSubject(): void {
    this.subjectService.delete(this.currentSubject.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/subjects']);
        },
        error => {
          console.log(error);
        });
  }
}
