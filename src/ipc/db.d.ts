import { Disposable } from 'event-kit'
import type {
  Note,
  NoteStatus,
  Book,
  Tag,
  File as IDFile
} from 'inkdrop-model'

/** Result of a PouchDB put/remove operation. */
export interface PouchDBPutResult {
  ok: boolean
  id: string
  rev: string
}

/** Options for querying notes. */
export interface NoteQueryOptions {
  limit?: number
  skip?: number
  sort?: Array<Record<string, 'asc' | 'desc'>>
  includeDocs?: boolean
}

/** Result of a note query. */
export interface NoteQueryResult<T = Note> {
  docs: T[]
  totalRows?: number
}

/** Database interface for notes. */
export interface IDBNote {
  /** Generate a new note ID. */
  createId(): string
  /** Validate whether a string is a valid note ID. */
  validateDocId(docId: string): boolean
  /** Get a note by its ID. */
  get(docId: string, options?: Record<string, any>): Promise<Note>
  /** Create or update a note. */
  put(
    doc: Note & { _rev?: string }
  ): Promise<PouchDBPutResult & { timestamp: number }>
  /** Remove a note by its ID. */
  remove(docId: string, rev?: string): Promise<PouchDBPutResult>
  /** Remove multiple notes by their IDs. */
  removeBatch(docIds: string[]): Promise<PouchDBPutResult[]>
  /** Count all notes. */
  countAll(opts?: Record<string, any>): Promise<number>
  /** Query notes with a Mango-style query. */
  query(q: any): Promise<NoteQueryResult>
  /** Query notes using a database index. */
  queryWithIndex(query: any): Promise<NoteQueryResult>
  /** Query notes using full-text search. */
  queryWithFTS(query: any): Promise<NoteQueryResult>
  /** Get all notes. */
  all(opts?: NoteQueryOptions): Promise<NoteQueryResult>
  /** Find all pinned notes. */
  findPinned(opts?: NoteQueryOptions): Promise<NoteQueryResult>
  /** Find notes in a specific notebook. */
  findInBook(
    bookId: string,
    opts?: NoteQueryOptions
  ): Promise<NoteQueryResult>
  /** Find notes with a specific tag. */
  findWithTag(
    tagId: string,
    opts?: NoteQueryOptions
  ): Promise<NoteQueryResult>
  /** Find notes with a specific status. */
  findWithStatus(
    status: NoteStatus,
    opts?: NoteQueryOptions
  ): Promise<NoteQueryResult>
  /** Search notes with a parsed query. */
  searchWithQuery(
    query: any,
    opts?: any
  ): Promise<Note[] | string[]>
}

/** Database interface for notebooks. */
export interface IDBBook {
  /** Generate a new notebook ID. */
  createId(): string
  /** Validate whether a string is a valid notebook ID. */
  validateDocId(docId: string): boolean
  /** Create or update a notebook. */
  put(doc: Book & { _rev?: string }): Promise<PouchDBPutResult>
  /** Get a notebook by its ID. */
  get(docId: string, options?: Record<string, any>): Promise<Book>
  /** Remove a notebook by its ID. */
  remove(docId: string): Promise<PouchDBPutResult>
  /** Count all notebooks. */
  countAll(opts?: Record<string, any>): Promise<number>
  /** Get all notebooks. */
  all(opts?: Record<string, any>): Promise<Book[]>
  /** Get all notebook IDs. */
  allIds(): Promise<string[]>
  /** Find a notebook by its name. */
  findWithName(name: string): Promise<Book>
  /** Get the direct children of a notebook. */
  getChildren(parentBookId: string | null): Promise<Book[]>
  /** Get all descendants of a notebook. */
  getAllChildren(parentBookId: string): Promise<Book[]>
  /** Get the chain of parent notebook IDs. */
  getParentBookIds(
    bookId: string,
    parentBookIds?: string[]
  ): Promise<string[]>
}

/** Database interface for tags. */
export interface IDBTag {
  /** Generate a new tag ID. */
  createId(): string
  /** Validate whether a string is a valid tag ID. */
  validateDocId(docId: string): boolean
  /** Create or update a tag. */
  put(doc: Tag & { _rev?: string }): Promise<PouchDBPutResult>
  /** Get a tag by its ID. */
  get(docId: string, options?: Record<string, any>): Promise<Tag>
  /** Remove a tag by its ID. */
  remove(docId: string): Promise<PouchDBPutResult>
  /** Find a tag by its name. */
  findWithName(name: string): Promise<Tag | null>
  /** Count all tags. */
  countAll(opts?: Record<string, any>): Promise<number>
  /** Get all tags. */
  all(opts?: Record<string, any>): Promise<Tag[]>
}

/** Database interface for file attachments. */
export interface IDBFile {
  /** Generate a new file ID. */
  createId(): string
  /** Validate whether a string is a valid file ID. */
  validateDocId(docId: string): boolean
  /** Create or update a file attachment. */
  put(doc: IDFile & { _rev?: string }): Promise<PouchDBPutResult>
  /** Get a file attachment by its ID. */
  get(docId: string, options?: Record<string, any>): Promise<IDFile>
  /** Remove a file attachment by its ID. */
  remove(docId: string): Promise<PouchDBPutResult>
  /** Count all file attachments. */
  countAll(opts?: Record<string, any>): Promise<number>
  /** Get all file attachments. */
  all(opts?: Record<string, any>): Promise<IDFile[]>
  /** Mark a file as shared in a note. */
  share(fileId: string, noteId: string): Promise<IDFile>
  /** Remove sharing of a file from a note. */
  unshare(fileId: string, noteId: string): Promise<IDFile>
  /** Share all files referenced in a Markdown string. */
  shareFilesFromMarkdown(
    markdown: string,
    noteId: string
  ): Promise<IDFile[]>
  /** Unshare all files referenced in a Markdown string. */
  unshareFilesFromMarkdown(
    markdown: string,
    noteId: string
  ): Promise<IDFile[]>
}

/** Database utility operations. */
export interface IDBUtils {
  /** Full-text search for notes. */
  search(keyword: string, opts?: any): Promise<NoteQueryResult>
  /**
   * Move a notebook to a new parent.
   * @param bookId - The notebook to move.
   * @param newParentBookId - The new parent notebook ID, or `null` for root.
   * @param order - The sort order position.
   */
  moveBook(
    bookId: string,
    newParentBookId: string | null,
    order: number
  ): Promise<Book>
  /** Move all notes in a notebook to trash. */
  moveNotesInBookToTrash(
    bookId: string,
    opts: { includeChildren?: boolean; tagId?: string }
  ): Promise<void>
  /** Delete a notebook and its contents. */
  deleteBook(bookId: string): Promise<any>
  /** Update a tag's note count. */
  updateTag(
    tagId: string
  ): Promise<{ updated: boolean; doc: Tag }>
  /** Update a tag by name. */
  updateTagWithName(
    name: string
  ): Promise<{ updated: boolean; doc: Tag }>
  /** Delete a tag and remove it from all notes. */
  deleteTag(tagId: string): Promise<boolean | PouchDBPutResult>
}

/**
 * Provides access to the local PouchDB database via IPC.
 *
 * An instance of this class is always available as the `inkdrop.localDB` global.
 */
export declare class IPCLocalDatabase {
  /** Notes database. */
  notes: IDBNote
  /** Notebooks database. */
  books: IDBBook
  /** Tags database. */
  tags: IDBTag
  /** File attachments database. */
  files: IDBFile
  /** Utility operations. */
  utils: IDBUtils

  /** Check whether the database has been loaded. */
  isLoaded(): Promise<boolean>
  /**
   * Subscribe to all database changes.
   * @param callback - Called with the change object.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onChange(
    callback: (change: Record<string, any>) => void
  ): Disposable
  /**
   * Subscribe to note changes only.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onNoteChange(
    callback: (change: Record<string, any>) => void
  ): Disposable
  /**
   * Subscribe to notebook changes only.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onBookChange(
    callback: (change: Record<string, any>) => void
  ): Disposable
  /**
   * Subscribe to tag changes only.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onTagChange(
    callback: (change: Record<string, any>) => void
  ): Disposable
}
