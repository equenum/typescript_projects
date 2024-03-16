// aliases
import * as Proj from './services/project-input.js';
import { ProjectList as ProjList } from './services/project-list.js';
import { ProjectState } from './state/project-state.js';

export const globalProjectState = ProjectState.getInstance();

// business logic
const projectInput = new Proj.ProjectInput();
const activePrjList = new ProjList('active');
const finishedPrjList = new ProjList('finished');
