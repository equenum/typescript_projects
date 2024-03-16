/// <reference path="component.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../interfaces/draggable.ts"/>

namespace DragDrop {
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
      if (this.project.people === 0) {
        return 'No people assigned yet.';
      } else {
        return this.project.people > 1 ? `${this.project.people} persons assigned` : '1 person assigned';
      }
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(event: DragEvent): void {
      console.log('Drag end');
    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.persons;
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }
}
