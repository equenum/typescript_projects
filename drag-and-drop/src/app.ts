import { ProjectInput } from './services/project-input.js';
import { ProjectList } from './services/project-list.js';
import { ProjectState } from './state/project-state.js';

export const globalProjectState = ProjectState.getInstance();

// business logic
const projectInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
