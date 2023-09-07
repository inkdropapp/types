import type { BooksActionType } from '../actions/books';
import type { Book } from '@inkdropapp/model-private';
export type BooksState = {
    all: Book[];
    tree: BookTree;
    hash: Record<string, Book>;
    lastUpdatedAt: number;
};
export type BookTreeItem = Book & {
    children: BookTreeItem[];
};
export type BookTree = BookTreeItem[];
export declare const initialBookState: BooksState;
export default function books(state: BooksState | undefined, action: BooksActionType): BooksState;
