import { Disposable } from 'event-kit'
import type { Note, NoteStatus, Book, Tag, File as IDFile } from 'inkdrop-model'

/** Result of a PouchDB put/remove operation. */
export interface PouchDBPutResult {
  ok: boolean
  id: string
  rev: string
}

/**
 * How a result is delivered, independent of the query: with the documents
 * loaded (`includeDocs: true`, the default) or as id/rev rows. Not part of a
 * query or its cursor, so a caller chooses it on every page.
 */
export interface NoteQueryResultOptions {
  includeDocs?: boolean
}

/** Options for the note list finders */
export interface NoteQueryOptions extends NoteQueryResultOptions {
  /** Defaults to `true` */
  pinnedFirst?: boolean
  /**
   * Sort entries, first supported key wins; each entry holds one key:
   * `updatedAt`, `createdAt`, `title`, or `tagCount`.
   * Defaults to `[{ updatedAt: 'desc' }]`
   */
  sort?: Array<Partial<Record<'updatedAt' | 'createdAt' | 'title' | 'tagCount', 'asc' | 'desc'>>>
  /** `false` = no limit */
  limit?: number | false
  skip?: number
}

/**
 * Ordering, paging, and output options of a search. `sort` accepts `rank` for
 * relevance; when omitted or empty it defaults to `[{ rank: 'asc' }]` if there
 * is a keyword to match, otherwise to `[{ updatedAt: 'desc' }]`.
 */
export interface NoteSearchOptions extends Omit<NoteQueryOptions, 'sort'> {
  /** `rank`: relevance, best first when ascending. Search only, and needs a keyword to match. */
  sort?: Array<
    Partial<Record<'updatedAt' | 'createdAt' | 'title' | 'tagCount' | 'rank', 'asc' | 'desc'>>
  >
  /** Return where the matches sit in each note's title and body. Defaults to `false` */
  highlightMatches?: boolean
}

/** A matched span: `off*` index the whole string, `line`/`ch*` locate it within its line */
export interface HighlightMarkPosition {
  offStart: number
  offEnd: number
  line: number
  chStart: number
  chEnd: number
}

/** Where a keyword search matched a note's title and body. */
export interface NoteSearchHighlights {
  titleHighlights: HighlightMarkPosition[]
  bodyHighlights: HighlightMarkPosition[]
}

/** Data attached to each row of a result as `extra`. */
export interface NoteQueryResultExtraInfo {
  fts?: NoteSearchHighlights
}

interface NoteQueryResultBase<IncludeDocs extends boolean, Row> {
  totalRows: number
  query: any
  cursor: any | null
  includeDocs: IncludeDocs
  rows: Row[]
}

/** A result with the documents loaded (`includeDocs: true`, the default). */
export type NoteQueryResultIncludingDocs<T = Note, V = {}> = NoteQueryResultBase<
  true,
  { doc: T; extra?: V }
>

/** Rows come straight from the index (id and indexed revision), so a rows-only result costs no PouchDB read */
export type NoteQueryResultNotIncludingDocs<V = {}> = NoteQueryResultBase<
  false,
  { id: string; rev: string; extra?: V }
>

/** `V` is data attached to each row as `extra`, beside the document or its id */
export type NoteQueryResult<T = Note, V = {}> =
  | NoteQueryResultIncludingDocs<T, V>
  | NoteQueryResultNotIncludingDocs<V>

/** Database interface for notes. */
export interface IDBNote {
  /** Generate a new note ID. */
  createId(): string
  /** Validate whether a string is a valid note ID. */
  validateDocId(docId: string): boolean
  /**
   * One note by id, or several in one round trip when given an array: the
   * documents come back in the order of the ids, and ids that no longer
   * resolve to a live note are dropped rather than throwing.
   */
  get(docId: string, options?: Record<string, any>): Promise<Note>
  get(docIds: string[]): Promise<Note[]>
  /** Create or update a note. */
  put(doc: Note & { _rev?: string }): Promise<PouchDBPutResult & { timestamp: number }>
  /** Remove a note by its ID. */
  remove(docId: string, rev?: string): Promise<PouchDBPutResult>
  /** Remove multiple notes by their IDs. */
  removeBatch(docIds: string[]): Promise<PouchDBPutResult[]>
  /** Count all notes. */
  countAll(opts?: Record<string, any>): Promise<number>
  /** Query notes with a list query (`index: 'notes'`) or a full-text search (`index: 'fts'`). */
  query(
    q: any,
    opts?: NoteQueryResultOptions
  ): Promise<NoteQueryResult<Note, NoteQueryResultExtraInfo>>
  /** Query notes using the note index. */
  queryWithIndex(query: any, opts?: NoteQueryResultOptions): Promise<NoteQueryResult>
  /** Query notes using full-text search. */
  queryWithFTS(
    query: any,
    opts?: NoteQueryResultOptions
  ): Promise<NoteQueryResult<Note, NoteQueryResultExtraInfo>>
  /** Get all notes. */
  all(opts?: NoteQueryOptions): Promise<NoteQueryResult>
  /** Find notes in a specific notebook. */
  findInBook(bookId: string, opts?: NoteQueryOptions): Promise<NoteQueryResult>
  /** Find notes with a specific tag. */
  findWithTag(tagId: string, opts?: NoteQueryOptions): Promise<NoteQueryResult>
  /** Find notes with a specific status. */
  findWithStatus(status: NoteStatus, opts?: NoteQueryOptions): Promise<NoteQueryResult>
  /** Number of notes a list with the same filters would contain */
  count(query?: any): Promise<number>
  /**
   * Every note in a notebook, closed statuses included, optionally with its
   * descendant notebooks and narrowed to one tag
   */
  findAllIdsInBook(
    bookId: string,
    opts?: { includeChildren?: boolean; tagId?: string }
  ): Promise<string[]>
  /** Every note carrying the tag, trash and closed statuses included */
  findAllIdsWithTag(tagId: string): Promise<string[]>
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
  findWithName(name: string): Promise<Book | null>
  /** Get the direct children of a notebook. */
  getChildren(parentBookId: string | null): Promise<Book[]>
  /** Get all descendants of a notebook. */
  getAllChildren(parentBookId: string): Promise<Book[]>
  /** Ancestor notebook ids, root first */
  getParentBookIds(bookId: string): Promise<string[]>
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
  shareFilesFromMarkdown(markdown: string, noteId: string): Promise<IDFile[]>
  /** Unshare all files referenced in a Markdown string. */
  unshareFilesFromMarkdown(markdown: string, noteId: string): Promise<IDFile[]>
}

/** Database utility operations. */
export interface IDBUtils {
  /** Full-text search for notes. */
  search(
    keyword: string,
    opts?: NoteSearchOptions
  ): Promise<NoteQueryResult<Note, NoteQueryResultExtraInfo>>
  /**
   * Move a notebook to a new parent.
   * @param bookId - The notebook to move.
   * @param newParentBookId - The new parent notebook ID, or `null` for root.
   * @param order - The sort order position.
   */
  moveBook(bookId: string, newParentBookId: string | null, order: number): Promise<Book>
  /** Move all notes in a notebook to trash. */
  moveNotesInBookToTrash(
    bookId: string,
    opts: { includeChildren?: boolean; tagId?: string }
  ): Promise<void>
  /** Delete a notebook and its contents. */
  deleteBook(bookId: string): Promise<any>
  /** Update a tag by name. */
  updateTagWithName(name: string): Promise<{ updated: boolean; doc: Tag }>
  /** Delete a tag and remove it from all notes. */
  deleteTag(tagId: string): Promise<boolean | PouchDBPutResult>
}

/**
 * Provides access to the local PouchDB database via IPC.
 *
 * Available as `env.localDB` in your plugin's `activate(env: Environment)` method.
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
  onChange(callback: (change: Record<string, any>) => void): Disposable
  /**
   * Subscribe to note changes only.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onNoteChange(callback: (change: Record<string, any>) => void): Disposable
  /**
   * Subscribe to notebook changes only.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onBookChange(callback: (change: Record<string, any>) => void): Disposable
  /**
   * Subscribe to tag changes only.
   * @returns A {@link Disposable} on which `.dispose()` can be called to unsubscribe.
   */
  onTagChange(callback: (change: Record<string, any>) => void): Disposable
}
