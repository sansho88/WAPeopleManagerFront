import { Component } from '@angular/core';
import { People } from '../../models/people';
import { Job } from '../../models/job';
import { PeopleService } from '../../services/people.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent {
  personForm: FormGroup;
  jobForm: FormGroup;
  jobs: Job[] = [];
  today =  Date.now();
lastJob: Job | null = null;

  constructor(private peopleService: PeopleService, private fb: FormBuilder) {
    this.personForm = this.createPersonForm();
    this.jobForm = this.createJobForm();
  }

  private createPersonForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthday: ['', [Validators.required]]
    });
  }

  private createJobForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['']
    });
  }

  addJob(): void {
    if (this.jobForm.invalid) {
      alert('Veuillez remplir correctement tous les champs du formulaire de Job.');
      return;
    }

    this.jobs.push(new Job(
      this.jobForm.value.title,
      this.jobForm.value.companyName,
      new Date(this.jobForm.value.startDate),
      this.jobForm.value.endDate ? new Date(this.jobForm.value.endDate) : undefined
    ));
    this.jobForm.reset();
  }

  async onSubmit(): Promise<void> {
    if (this.personForm.invalid) {
      alert('Veuillez remplir correctement tous les champs.');
      return;
    }

    try {
      const person = new People(
        0,
        this.personForm.value.firstName,
        this.personForm.value.lastName,
        new Date(this.personForm.value.birthday),
        this.jobs
      );
      person.validateAge(person.birthday);

      await this.peopleService.createPerson(person);

      alert('Personne et emplois créés avec succès !');
      this.personForm.reset();
      this.jobs = [];
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
}
