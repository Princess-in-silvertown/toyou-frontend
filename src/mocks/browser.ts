import { SetupWorker, setupWorker } from 'msw/browser';
import { handlers } from './handler';

export const worker: SetupWorker = setupWorker(...handlers);
