import { Job } from './job';

export class People {
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    jobs: Job[];

    static MAX_AGE = 150;

  // constructor(id, firstName, lastName, date: Date, p: any[]);
    constructor(
        id: number = 0,
        firstName: string = '',
        lastName: string = '',
        birthday: Date = new Date(),
        jobs: Job[] = []
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.jobs = jobs;
    }

    public validateAge(birthday: Date): void {
        const age = new Date().getFullYear() - birthday.getFullYear();
        if (age > People.MAX_AGE) {
            throw new Error(`Vous ne pouvez pas avoir plus de ${People.MAX_AGE} ans.`);
        }
    }

    addJob(job: Job): void {
        this.jobs.push(job);
    }

    public getCurrentJobs(): Job[] {
        return this.jobs.filter(job => job.isActive());
    }

    static sortPeopleAlphabetically(people: People[]): People[] {
        return people.sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));
    }

    static findByCompany(people: People[], companyName: string): People[] {
        return people.filter(person => person.jobs.some(job => job.companyName === companyName));
    }

    getLastJob(): Job | null {
        if (this.jobs.length === 0) {
            return null;
        }
        return this.jobs.reduce((latest, job) => {
            if (!latest || (job.endDate && job.endDate > (latest.endDate ?? new Date()))) {
                return job;
            }
            return latest;
        }, this.jobs[0]);
    }

    getJobsBetweenDates(startDate: Date, endDate: Date): Job[] {
        return this.jobs.filter(job => job.overlapsWith(startDate, endDate));
    }

    toString(): string {
        return `Id: ${this.id}, FirstName: ${this.firstName}, LastName: ${this.lastName}, Birthday: ${this.birthday.toDateString()}, Jobs: [${this.jobs.join(', ')}]`;
    }
    toJson(): any {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            birthday: this.birthday.toISOString(),
            jobs: this.jobs.map(job => ({
                title: job.title,
                companyName: job.companyName,
                startDate: job.startDate.toISOString(),
                endDate: job.endDate ? job.endDate.toISOString() : null
            }))
        };
    }
    static fromJson(json: any): People {
            return new People(
                json.id,
                json.firstName,
                json.lastName,
                new Date(json.birthday),
                json.jobs ? json.jobs.map((job: any) => new Job(job.title, job.companyName, new Date(job.startDate), job.endDate ? new Date(job.endDate) : new Date())) : []
            );
        }
}
