// default - main export;
// this allows importing in other files without {}
// import Cmp from './...' | Cmp - alias

export /*default*/ abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
