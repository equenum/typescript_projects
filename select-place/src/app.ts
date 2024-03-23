import axios from 'axios';
import { Blog } from './models/blog.model';

const inputForm = document.querySelector('form')! as HTMLFormElement;
const selectDropDown = document.getElementById('blog-title-select')! as HTMLSelectElement;
const blogHostElement = document.getElementById('blog')! as HTMLDivElement;

inputForm.addEventListener('submit', renderBlog);

let blogs: Blog[] = [];

populateDropDown();

function populateDropDown() {
  axios
    .get('https://dummyapi.online/api/blogposts')

    .then((response) => {
      var mappedBlogs = response.data.map((blogD: any) => {
        return new Blog(blogD.id, blogD.title, blogD.author, blogD.date_published, blogD.content);
      });

      for (let blog of mappedBlogs) {
        blogs.push(blog);

        const option = document.createElement('option');
        option.value = blog.title;
        option.innerHTML = blog.title;

        selectDropDown.appendChild(option);
      }
    })

    .catch((error) => {
      console.log(error);
    });
}

function renderBlog(event: Event) {
  event.preventDefault();
  const blogTitle = selectDropDown.value;
  const targetBlog = blogs.find((bl) => bl.title === blogTitle);

  if (targetBlog) {
    blogHostElement.innerHTML = '';

    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = targetBlog.title;

    const authorDiv = document.createElement('div');
    authorDiv.innerHTML = targetBlog.author;

    const publishedDiv = document.createElement('div');
    publishedDiv.innerHTML = targetBlog.date_published;

    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = targetBlog.content;

    blogHostElement.appendChild(titleDiv);
    blogHostElement.appendChild(authorDiv);
    blogHostElement.appendChild(publishedDiv);
    blogHostElement.appendChild(contentDiv);
  }
}
