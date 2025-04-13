import {Component} from '@angular/core';
import {PeopleListComponent} from './components/people-list/people-list.component';
import {HttpClient} from '@angular/common/http';
import {PeopleFormComponent} from './components/people-form/people-form.component';

@Component({
  selector: 'app-root',
  imports: [PeopleListComponent, PeopleFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WAPeopleManager';
}
