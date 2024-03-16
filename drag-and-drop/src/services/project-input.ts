/// <reference path="component.ts"/>
/// <reference path="../models/user-project-input.ts"/>

namespace DragDrop {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // imported form input elements
    private readonly titleInputElement: HTMLInputElement;
    private readonly descriptionInputElement: HTMLInputElement;
    private readonly peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');

      // bind imported form input elements
      this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement; // # the same as getElementById
      this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

      this.configure();
    }

    private clearUserInput() {
      const emptyValue = '';

      this.titleInputElement.value = emptyValue;
      this.descriptionInputElement.value = emptyValue;
      this.peopleInputElement.value = emptyValue;
    }

    renderContent() {}

    private getUserInput(): UserProjectInput | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      if (this.hasEmptyElements(enteredTitle, enteredDescription, enteredPeople)) {
        alert('Invalid input parameters! Please, try again.');
        return;
      } else {
        return new UserProjectInput(enteredTitle, enteredDescription, +enteredPeople);
      }
    }

    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.getUserInput();

      if (userInput) {
        globalProjectState.addProject(userInput.title, userInput.description, userInput.people);
      }

      this.clearUserInput();
    }

    private hasEmptyElements(...elements: string[]) {
      for (let element of elements) {
        if (element.trim().length === 0) {
          return true;
        }
      }

      return false;
    }

    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }
  }
}
