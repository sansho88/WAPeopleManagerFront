import {Component, OnInit} from '@angular/core';
import {PeopleService} from '../../services/people.service';
import {People} from '../../models/people';
import {CommonModule, DatePipe} from '@angular/common';
import {map} from 'rxjs';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
  imports: [
    CommonModule,
    DatePipe
  ]
})
export class PeopleListComponent {
  people: People[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  today = new Date();

  constructor(private peopleService: PeopleService) {
    this.fetchPeople();
  }

  fetchPeople(): void {
    this.peopleService.getAllPeople().then((list) => {
      this.people = list.sort((a, b) =>
        a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName)
      );
      this.isLoading = false;
      this.isLoading = false;
      this.errorMessage = null;
    })
      .catch(error => {
        this.errorMessage = 'Failed to load people data.';
        console.error(error);
      })
  }

  protected readonly Date = Date;
  protected readonly Number = Number;
}
