namespace DragDrop {
  export enum ProjectStatus {
    Active = 0,
    Finished = 1
  }

  export class Project {
    public readonly id: string;
    public readonly title: string;
    public readonly description: string;
    public readonly people: number;
    public status: ProjectStatus;

    constructor(id: string, title: string, description: string, people: number, status: ProjectStatus) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.people = people;
      this.status = status;
    }
  }
}
