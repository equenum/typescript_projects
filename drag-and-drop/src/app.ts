// interfaces

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

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

enum ProjectStatus {
  Active = 0,
  Finished = 1
}

class Project {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly people: number;
  public readonly status: ProjectStatus;

  constructor(id: string, title: string, description: string, people: number, status: ProjectStatus) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = status;
  }
}

// global state management singleton

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
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
    for (const listener of this.listeners) {
      listener(this.projects.slice()); // .slice() returns a copy of the array
    }
  }
}

const globalProjectState = ProjectState.getInstance();

class UserProjectInput {
  readonly title: string;
  readonly description: string;
  readonly people: number;

  constructor(title: string, description: string, people: number) {
    this.title = title;
    this.description = description;
    this.people = people;
  }
}

type ProjectType = 'active' | 'finished';

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement; // the hidden template element
  hostElement: T; // the output element
  element: U; // the element that we take from the hidden template and display in the output element

  constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  private readonly templateElementId = 'project-list';
  private readonly hostElementId = 'app';

  private readonly type: ProjectType;
  private assignedProjects: Project[] = [];
  constructor(type: ProjectType) {
    super('project-list', 'app', false, `${type}-projects`);
    this.type = type;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] == 'text/plain') {
      event.preventDefault(); // default is not allow dropping
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');

    console.log('Adding new droppable');
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    globalProjectState.addListener((projects: Project[]) => {
      const activeProjects = projects.filter((project) => {
        if (this.type == 'active') {
          return project.status === ProjectStatus.Active;
        }
      });

      this.assignedProjects = activeProjects;
      this.renderProjects();
    });
  }

  renderProjects() {
    const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    listElement.innerHTML = ''; // reset the list

    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    }
  }

  renderContent() {
    this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
    this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

// business logic
const projectInput = new ProjectInput();
const activeProjects = new ProjectList('active');
const finishedProjects = new ProjectList('finished');
