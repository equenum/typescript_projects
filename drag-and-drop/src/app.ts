// references: this approach only provides reference clues to TS, does not actually bundle JS files
/// <reference path="services/project-input.ts"/>
/// <reference path="services/project-list.ts"/>
/// <reference path="state/project-state.ts"/>

namespace DragDrop {
  export const globalProjectState = ProjectState.getInstance();
  // business logic
  const projectInput = new ProjectInput();
  const activePrjList = new ProjectList('active');
  const finishedPrjList = new ProjectList('finished');
}
