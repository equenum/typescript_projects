// aliases
import * as Proj from './services/project-input';
import { ProjectList as ProjList } from './services/project-list';
import { ProjectState } from './state/project-state';

export const globalProjectState = ProjectState.getInstance();

// business logic
const projectInput = new Proj.ProjectInput();
const activePrjList = new ProjList('active');
const finishedPrjList = new ProjList('finished');
