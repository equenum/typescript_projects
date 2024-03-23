export class Blog {
  readonly id: number;
  readonly title: string;
  readonly author: string;
  readonly date_published: string;
  readonly content: string;

  constructor(id: number, title: string, author: string, date_published: string, content: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.date_published = date_published;
    this.content = content;
  }
}
