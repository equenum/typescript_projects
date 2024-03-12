// classes

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

  // event handlers
  private submitHandler(event: Event) {
    event.preventDefault();

    console.log(this.titleInputElement.value);
    console.log(this.descriptionInputElement.value);
    console.log(this.peopleInputElement.value);

    // handle here ...
  }

  private configure() {
    this.formElement.addEventListener('submit', this.submitHandler.bind(this));
  }

  private attachTemplate() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}

// business logic
var projectInput = new ProjectInput();
