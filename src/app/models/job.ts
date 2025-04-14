export class Job {
  title: string;
  companyName: string;
  startDate: Date;
  endDate?: Date;

  constructor(title: string, companyName: string, startDate: Date, endDate?: Date) {
    this.title = title;
    this.companyName = companyName;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  isActive(date: Date = new Date()): boolean {
    return (!this.endDate || this.endDate > date) && this.startDate <= date;
  }

  overlapsWith(startDate: Date, endDate: Date): boolean {
    return this.startDate <= endDate && (!this.endDate || this.endDate >= startDate);
  }


  toString(): string {
    return `Title: ${this.title}, CompanyName: ${this.companyName}, StartDate: ${this.startDate.toDateString()}, EndDate: ${this.endDate ? this.endDate.toDateString() : 'Present'}`;
  }

  toJson(): any {
    return {
      title: this.title,
      companyName: this.companyName,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate ? this.endDate.toISOString() : null,
    };
  }
  static fromJson(json: any): Job {
    return new Job(
      json.title,
      json.companyName,
      new Date(json.startDate),
      json.endDate ? new Date(json.endDate) : undefined
    );
  }
}
