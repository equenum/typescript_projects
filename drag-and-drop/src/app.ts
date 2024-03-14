// decorators

function autobind(_1: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    }
  };

  return adjustedDescriptor;
}

// classes

class UserProjectInput {
  private readonly title: string;
  private readonly description: string;
  private readonly people: number;

  constructor(title: string, description: string, people: number) {
    this.title = title;
    this.description = description;
    this.people = people;
  }
}

type ProjectType = 'active' | 'finished';

class ProjectList {
  private readonly templateElementId = 'project-list';
  private readonly hostElementId = 'app';

  private readonly type: ProjectType;

  private readonly templateElement: HTMLTemplateElement;
  private readonly hostElement: HTMLDivElement;
  private readonly sectionElement: HTMLElement;

  constructor(type: ProjectType) {
    this.type = type;

    this.templateElement = document.getElementById(this.templateElementId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(this.hostElementId)! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.sectionElement = importedNode.firstElementChild as HTMLElement;
    this.sectionElement.id = `${this.type}-projects`;
    this.sectionElement.className = 'projects';

    this.renderContent();
    this.attach();
  }

  private renderContent() {
    this.sectionElement.querySelector('ul')!.id = `${this.type}-projects-list`;
    this.sectionElement.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.sectionElement);
  }
}

class ProjectInput {
  private readonly templateElementId = 'project-input';
  private readonly hostElementId = 'app';

  private readonly templateElement: HTMLTemplateElement; // the hidden template
  private readonly hostElement: HTMLDivElement; // the output div
  private readonly formElement: HTMLFormElement; // the form that we take from the hidden template and display in the output div

  // imported form input elements
  private readonly titleInputElement: HTMLInputElement;
  private readonly descriptionInputElement: HTMLInputElement;
  private readonly peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(this.templateElementId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(this.hostElementId)! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = 'user-input';

    // bind imported form input elements
    this.titleInputElement = this.formElement.querySelector('#title')! as HTMLInputElement; // # the same as getElementById
    this.descriptionInputElement = this.formElement.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector('#people')! as HTMLInputElement;

    this.configure();
    this.attachTemplate();
  }

  private clearUserInput() {
    const emptyValue = '';

    this.titleInputElement.value = emptyValue;
    this.descriptionInputElement.value = emptyValue;
    this.peopleInputElement.value = emptyValue;
  }

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
      console.log(userInput);
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

  private configure() {
    this.formElement.addEventListener('submit', this.submitHandler);
  }

  private attachTemplate() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}

// business logic
const projectInput = new ProjectInput();
const activeProjects = new ProjectList('active');
const finishedProjects = new ProjectList('finished');
