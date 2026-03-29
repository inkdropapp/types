import type {
  Note,
  NoteStatus,
  NoteVisibility,
  Book,
  Tag,
  TagColor,
  File as IDFile,
  FileAttachmentItem,
  ImageFileType
} from 'inkdrop-model'

/**
 * A PouchDB put result.
 */
export interface PutResult {
  ok: boolean
  id: string
  rev: string
}

/**
 * An ORM wrapper around a {@link Note} document.
 *
 * Provides validation, persistence, and helper methods for working with notes.
 *
 * @example
 * ```typescript
 * import { models } from 'inkdrop'
 * const note = new models.Note({
 *   title: 'My Note',
 *   body: '# Hello',
 *   bookId: 'book:abc123'
 * })
 * await note.save()
 * ```
 */
export declare class ModelNote {
  /** The document ID (e.g., `'note:abc123'`). */
  _id: string
  /** The PouchDB revision string. */
  _rev: string | null | undefined
  /** The notebook ID this note belongs to. */
  bookId: string
  /** The note title. */
  title: string
  /** The document type (e.g., `'markdown'`). */
  doctype: string
  /** The Markdown body content. */
  body: string
  /** Last updated timestamp in milliseconds. */
  updatedAt: number
  /** Creation timestamp in milliseconds. */
  createdAt: number
  /** An array of tag IDs associated with this note. */
  tags: string[]
  /** The total number of task list items in the note. */
  numOfTasks: number | null | undefined
  /** The number of checked (completed) task list items. */
  numOfCheckedTasks: number | null | undefined
  /** The migration source identifier, if migrated. */
  migratedBy: string | null | undefined
  /** The note status (e.g., `'active'`, `'completed'`). */
  status: NoteStatus | null | undefined
  /** The note visibility (e.g., `'private'`, `'public'`). */
  share: NoteVisibility | null | undefined
  /** Whether the note is pinned. */
  pinned: boolean
  /** Conflicting revision IDs, if any. */
  _conflicts: string[] | null | undefined
  /** A timestamp used for ordering. */
  timestamp: number

  /**
   * Load a note from the local database by its ID.
   * @param noteId - The note document ID.
   * @returns A new {@link ModelNote} instance populated with the loaded data.
   */
  static loadWithId(noteId: string): Promise<ModelNote>

  /**
   * Create a new ModelNote instance.
   * @param initialValues - Initial property values. Unspecified fields receive defaults.
   */
  constructor(initialValues?: Partial<Note>)

  /** Get the `updatedAt` timestamp as a Date object. */
  getUpdatedAt(): Date
  /** Get the `createdAt` timestamp as a Date object. */
  getCreatedAt(): Date
  /** Check whether this note is shared (visibility is not `'private'`). */
  isNoteShared(): boolean
  /**
   * Validate this note against the schema.
   * @returns An empty array if valid, or an array of validation errors.
   */
  validate(): any[]
  /**
   * Save this note to the local database.
   * Validates the note and its references (notebook, tags) before saving.
   * @returns The PouchDB put result.
   * @throws If validation fails or referenced documents do not exist.
   */
  save(): Promise<PutResult>
  /** Convert this note to a plain {@link Note} object. */
  toObject(): Note
  /** Serialize this note to a JSON string. */
  toJson(): string
}

/**
 * An ORM wrapper around a {@link Book} (notebook) document.
 *
 * @example
 * ```typescript
 * import { models } from 'inkdrop'
 * const book = new models.Book({ name: 'My Notebook' })
 * await book.save()
 * ```
 */
export declare class ModelBook {
  /** The document ID (e.g., `'book:abc123'`). */
  _id: string
  /** The PouchDB revision string. */
  _rev: string | null | undefined
  /** The notebook name. */
  name: string
  /** Last updated timestamp in milliseconds. */
  updatedAt: number
  /** Creation timestamp in milliseconds. */
  createdAt: number
  /** The number of notes in this notebook. */
  count: number | null | undefined
  /** The parent notebook ID, or `null` for top-level notebooks. */
  parentBookId: string | null | undefined

  /**
   * Load a notebook from the local database by its ID.
   * @param bookId - The notebook document ID.
   * @returns A new {@link ModelBook} instance populated with the loaded data.
   */
  static loadWithId(bookId: string): Promise<ModelBook>

  /**
   * Create a new ModelBook instance.
   * @param initialValues - Initial property values. Unspecified fields receive defaults.
   */
  constructor(initialValues?: Partial<Book>)

  /**
   * Validate this notebook against the schema.
   * @returns An empty array if valid, or an array of validation errors.
   */
  validate(): any[]
  /**
   * Save this notebook to the local database.
   * @returns The PouchDB put result.
   * @throws If validation fails.
   */
  save(): Promise<PutResult>
  /** Convert this notebook to a plain object. */
  toObject(): any
  /** Serialize this notebook to a JSON string. */
  toJson(): string
}

/**
 * An ORM wrapper around a {@link Tag} document.
 *
 * @example
 * ```typescript
 * import { models } from 'inkdrop'
 * const tag = new models.Tag({ name: 'important' })
 * await tag.save()
 * ```
 */
export declare class ModelTag {
  /** The document ID (e.g., `'tag:abc123'`). */
  _id: string
  /** The PouchDB revision string. */
  _rev: string | null | undefined
  /** The tag name. */
  name: string
  /** The number of notes with this tag. */
  count: number | null | undefined
  /** The tag color. */
  color: TagColor
  /** Last updated timestamp in milliseconds. */
  updatedAt: number
  /** Creation timestamp in milliseconds. */
  createdAt: number

  /**
   * Load a tag from the local database by its ID.
   * @param tagId - The tag document ID.
   * @returns A new {@link ModelTag} instance populated with the loaded data.
   */
  static loadWithId(tagId: string): Promise<ModelTag>

  /**
   * Create a new ModelTag instance.
   * @param initialValues - Initial property values. Unspecified fields receive defaults.
   */
  constructor(initialValues?: Partial<Tag>)

  /**
   * Validate this tag against the schema.
   * @returns An empty array if valid, or an array of validation errors.
   */
  validate(): any[]
  /**
   * Save this tag to the local database.
   * @returns The PouchDB put result.
   * @throws If validation fails.
   */
  save(): Promise<PutResult>
  /** Convert this tag to a plain object. */
  toObject(): any
  /** Serialize this tag to a JSON string. */
  toJson(): string
}

/**
 * An ORM wrapper around a {@link IDFile | File} (attachment) document.
 *
 * Provides methods for creating file attachments from various sources
 * (File objects, Buffers, file paths) and persisting them to the database.
 *
 * @example
 * ```typescript
 * import { models } from 'inkdrop'
 * const file = await models.File.createFromFilePath('/path/to/image.png')
 * await file.save()
 * console.log(file.toMarkdown()) // ![image.png](inkdrop://file:abc123)
 * ```
 */
export declare class ModelFile {
  /** The document ID (e.g., `'file:abc123'`). */
  _id: string
  /** The PouchDB revision string. */
  _rev: string | null | undefined
  /** The file name. */
  name: string
  /** Creation timestamp in milliseconds. */
  createdAt: number
  /** The MIME type of the file. */
  contentType: ImageFileType | null | undefined
  /** The file size in bytes. */
  contentLength: number
  /** An array of note IDs this file is publicly shared in. */
  publicIn: string[]
  /** The file attachment data. */
  _attachments: { index: FileAttachmentItem } | null | undefined
  /** The MD5 hash digest of the file content. */
  md5digest: string | null | undefined

  /**
   * Load a file attachment from the local database by its ID.
   * @param docid - The file document ID.
   * @returns A new {@link ModelFile} instance with attachment data.
   */
  static loadWithId(docid: string): Promise<ModelFile>
  /**
   * Create a file attachment from a browser {@link File} object.
   * @param file - The File object to read.
   * @returns A new {@link ModelFile} instance.
   */
  static createFromFile(file: Readonly<File>): Promise<ModelFile>
  /**
   * Create a file attachment from a Buffer.
   * @param buffer - The file content as a Buffer.
   * @param contentType - The MIME type of the file.
   * @param filename - An optional file name.
   * @returns A new {@link ModelFile} instance.
   */
  static createFromBuffer(
    buffer: Buffer,
    contentType: string,
    filename?: string
  ): Promise<ModelFile>
  /**
   * Create a file attachment from a file path on disk.
   * @param filePath - The absolute path to the file.
   * @returns A new {@link ModelFile} instance.
   */
  static createFromFilePath(filePath: string): Promise<ModelFile>

  /**
   * Create a new ModelFile instance.
   * @param initialValues - Initial property values. Unspecified fields receive defaults.
   */
  constructor(initialValues?: Partial<IDFile>)

  /**
   * Validate this file against the schema.
   * @returns An empty array if valid, or an array of validation errors.
   */
  validate(): any[]
  /**
   * Load a file from the database and populate this instance.
   * @param fileId - The file document ID.
   * @returns The loaded file document.
   */
  loadWithId(fileId: string): Promise<IDFile>
  /**
   * Save this file to the local database.
   * @returns The PouchDB put result.
   * @throws If validation fails.
   */
  save(): Promise<PutResult>
  /**
   * Set the file content from a browser {@link File} object.
   * @param file - The File object to read.
   */
  setFile(file: Readonly<File>): Promise<void>
  /**
   * Set the file content from a PNG image buffer.
   * @param buffer - The PNG image data.
   */
  setPNGBuffer(buffer: Buffer): void
  /** Get the file content as a base64-encoded string. */
  getAsBase64(): string
  /** Get the file content as a Buffer. */
  getAsBuffer(): Buffer
  /**
   * Save the file to disk synchronously.
   * @param dirToSave - The directory path to save the file to.
   * @returns The saved file name.
   */
  saveFileSync(dirToSave: string): string
  /** Convert this file to a plain object. */
  toObject(): any
  /** Serialize this file to a JSON string. */
  toJson(): string
  /**
   * Generate a Markdown image link for this file.
   * @returns A Markdown image string (e.g., `![name](inkdrop://file:abc123)`).
   */
  toMarkdown(): string
}

/**
 * The models object containing ORM model classes for each document type.
 * Available as `models` from the `'inkdrop'` module.
 */
export interface Models {
  /** The Note model class. */
  Note: typeof ModelNote
  /** The Book (notebook) model class. */
  Book: typeof ModelBook
  /** The Tag model class. */
  Tag: typeof ModelTag
  /** The File (attachment) model class. */
  File: typeof ModelFile
}
