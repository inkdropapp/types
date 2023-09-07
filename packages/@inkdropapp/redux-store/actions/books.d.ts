import type { Book } from '@inkdropapp/model-private';
import type { ThunkAction } from '../types';
import type { BookTree } from '../reducers/books';
export declare const BOOKS_UPDATE = "BOOKS_UPDATE";
export type BooksActionType = {
    type: 'BOOKS_UPDATE';
    payload: {
        books: Book[];
        bookTree: BookTree;
        hash: Record<string, Book>;
    };
};
export declare function update(): ThunkAction<Promise<void>>;
export declare function changeNotebookName(bookId: string, name: string): ThunkAction<Promise<void>>;
export declare function createNotebook(name: string, parentBookId: string | null | undefined, opts?: {
    showNotesAfterCreation?: boolean;
}): ThunkAction<Promise<void>>;
export declare function moveNotebook(bookId: string, newParentBookId: string | null): ThunkAction<Promise<void>>;
export declare function deleteNotebook(bookId: string): ThunkAction<Promise<void>>;
