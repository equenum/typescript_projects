export class UserProjectInput {
  readonly title: string;
  readonly description: string;
  readonly people: number;

  constructor(title: string, description: string, people: number) {
    this.title = title;
    this.description = description;
    this.people = people;
  }
}
