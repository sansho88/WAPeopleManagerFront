import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People } from '../models/people';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private baseUrl = 'https://localhost:7033/api/People';

  constructor(private http: HttpClient) {}

  async getAllPeople(): Promise<People[]> {
    const data = await fetch(this.baseUrl);
    return await data.json() ?? [];
  }

  async getPersonById(id: number): Promise<People> {
    const data = await fetch(`${this.baseUrl}/${id}`);
    return await  data.json() ?? {};
  }

  async createPerson(person: People): Promise<People> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  }

  async updatePerson(id: number, person: People): Promise<People> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  }

  async deletePerson(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
  }

  async addJobToPerson(personId: number, job: Job): Promise<Job> {
    const response = await fetch(`${this.baseUrl}/${personId}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  }

  async addMultipleJobsToPerson(personId: number, jobs: Job[]): Promise<Job[]> {
    const response = await fetch(`${this.baseUrl}/${personId}/jobs/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobs)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  }

  async removeJobFromPerson(personId: number, job: Job): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${personId}/jobs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
  }

  async getJobsOfPerson(personId: number): Promise<Job[]> {
    const response = await fetch(`${this.baseUrl}/${personId}/jobs`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  }

  async getJobsOfPersonByDateRange(personId: number, startDate: string, endDate: string): Promise<Job[]> {
    const url = new URL(`${this.baseUrl}/${personId}/jobs/dates`);
    url.searchParams.append('startDate', startDate);
    url.searchParams.append('endDate', endDate);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  }

  async getPeopleByCompanyName(companyName: string): Promise<People[]> {
    const response = await fetch(`${this.baseUrl}/company/${companyName}`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  }

}
