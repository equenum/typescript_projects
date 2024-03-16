/// <reference path="../models/project.ts"/>

namespace DragDrop {
  type Listener<T> = (items: T[]) => void;

  export class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }

      this.instance = new ProjectState();
      return this.instance;
    }

    public addProject(title: string, description: string, numberOfPeople: number) {
      var project = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);

      this.projects.push(project);
      this.notify();
    }

    switchStatus(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);

      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.notify();
      }
    }

    private notify() {
      for (const listener of this.listeners) {
        listener(this.projects.slice()); // .slice() returns a copy of the array
      }
    }
  }
}
