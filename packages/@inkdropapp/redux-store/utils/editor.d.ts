import type { Note } from '@inkdropapp/model-private';
import type { State } from '../types';
import type { InkdropDatabase } from '@inkdropapp/pouchdb-store';
export declare function createNewNote(db: InkdropDatabase, state: State): Promise<Note>;
