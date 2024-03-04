// tsc.cmd app.ts --watch | -w
// tsc.cmd --init initialise the whole project
console.log('Hello!');

const button = document.querySelector('button')!; // can be null
button?.addEventListener('click', () => {
  console.log('Clicked!');
});

// a more explicit name to do the same as !
const truthyButton = document.querySelector('button');
if (truthyButton) {
  button?.addEventListener('click', () => {
    console.log('Clicked!');
  });
}
