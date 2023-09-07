import type { Book } from '@inkdropapp/model-private';
import type { BookTree } from '../reducers/books';
export declare function getBookTree(books: Book[]): BookTree;
export declare function getSortedBooks(bookTree: BookTree): Book[];
export declare function getHashedBooks(books: Book[]): Record<string, Book>;
export declare function getChildBookIds(all: Book[], rootBookId: string, childBookIds?: string[]): string[];
