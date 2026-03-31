# @inkdropapp/types

TypeScript type definitions for [Inkdrop](https://www.inkdrop.app/) plugin development.

This package provides ambient type declarations for the `inkdrop` global object (the `Environment` class) and the `'inkdrop'` module, giving plugin authors full IntelliSense and type-checking support.

## Installation

```bash
npm install --save-dev @inkdropapp/types
```

## Setup

Add `@inkdropapp/types` to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "inkdrop": [
        "./node_modules/@inkdropapp/types/src/inkdrop-module/index.d.ts"
      ]
    },
    "types": ["@inkdropapp/types"]
  }
}
```

This enables two things:

1. **The `inkdrop` global** -- typed as the `Environment` class, available in any file without importing
2. **The `'inkdrop'` module** -- typed ambient module for `import { ... } from 'inkdrop'`

## Usage

### The `inkdrop` global

The `inkdrop` global provides access to the application environment -- managers for commands, keymaps, packages, notifications, the local database, and more.

```typescript
// Access the config
const fontSize = inkdrop.config.get("editor.fontSize");

// Register a command
inkdrop.commands.add(document.body, {
  "my-plugin:do-something": () => {
    // ...
  },
});

// Query the local database
const note = await inkdrop.localDB.notes.get("note:abc123");

// Listen for editor load
inkdrop.onEditorLoad((editor) => {
  console.log("Editor loaded:", editor);
});
```

### The `'inkdrop'` module

Plugins can import utilities and models from the `'inkdrop'` module. These are provided by Inkdrop at runtime and should **not** be bundled into your plugin.

```typescript
import { models, logger, useModal, createLogger } from 'inkdrop'

// ORM models
const note = await models.Note.loadWithId('note:abc123')
note.title = 'Updated Title'
await note.save()

// Logging
logger.debug('Processing:', data)

const myLogger = createLogger('my-plugin')
myLogger.info('Plugin initialized')

// React hook for modals
function MyDialog() {
  const modal = useModal()
  return (
    <>
      <button onClick={modal.show}>Open</button>
      {modal.state.visible && <Dialog onClose={modal.close} />}
    </>
  )
}
```

Other exports from the `'inkdrop'` module include:

- `actions` -- Redux action creators (typed as `any`)
- `AssistiveError` -- Error class with `detail` and `debugInfo` properties
- `html2markdown` -- Convert HTML strings to Markdown
- `markdownRenderer` -- The application's Markdown renderer
- `exportUtils` -- Export notes as HTML or Markdown
- `importUtils` -- Import Markdown or HTML files as notes

### Command types

The package provides typed command maps for every scope in the application. Use these to get type-safe command dispatching:

```typescript
import type {
  EnvironmentCommands,
  EditorCommands,
  MDELocalCommands,
} from "@inkdropapp/types";
```

Each command map is a record of command names to their parameter types. Commands that take no parameters use `undefined`:

```typescript
// EnvironmentCommands
'core:new-note': undefined
'core:open-note': { noteId: string; revision?: string; viewMode?: EditorViewMode }

// EditorCommands
'core:save-note': undefined
'editor:insert-text': { text: string; selection?: { anchor: number; head?: number } }
```

Available command scopes: `EnvironmentCommands`, `WindowCommands`, `ApplicationCommands`, `EditorCommands`, `MDECommands`, `MDELocalCommands`, `MDEPreviewCommands`, `MDEPreviewLocalCommands`, `FindInNoteGlobalCommands`, `FindInNoteOnEditorLocalCommands`, `FindInNoteOnPreviewLocalCommands`, `NoteListBarLayoutCommands`, `NoteListBarCommands`, `NoteListSearchBarCommands`, `SidebarNavigationCommands`, `SidebarMenuCommands`, `SidebarMenuLocalCommands`, `SideBarMenuItemCommands`, `SidebarWorkspaceMenuCommands`, `SidebarWorkspaceMenuLocalCommands`, `EditorDrawerCommands`, `MainLayoutCommands`, `MDESearchBarLocalCommands`, `PreviewFindBarLocalCommands`.

### Importing individual types

All type definitions are also importable from `@inkdropapp/types` directly:

```typescript
import type {
  Environment,
  Config,
  CommandRegistry,
  NotificationManager,
  IPCLocalDatabase,
  KeymapManager,
  PackageManager,
  MarkdownRenderer,
  ModelNote,
  ModelBook,
  Logger,
  EnvironmentCommands,
  EditorCommands,
} from "@inkdropapp/types";
```

## What's included

### Environment & managers

| Type                  | Description                                         |
| --------------------- | --------------------------------------------------- |
| `Environment`         | The main application environment (`inkdrop` global) |
| `Config`              | Application configuration with schema enforcement   |
| `CommandRegistry`     | Register and dispatch commands                      |
| `KeymapManager`       | Keybinding management                               |
| `NotificationManager` | User notifications                                  |
| `PackageManager`      | Plugin lifecycle management                         |
| `ThemeManager`        | Theme management                                    |
| `ComponentManager`    | Custom React component registry                     |
| `LayoutManager`       | UI layout management                                |
| `StyleManager`        | Stylesheet management                               |
| `MenuManager`         | Application menu management                         |
| `ContextMenuManager`  | Context menu management                             |
| `TelescopeManager`    | Telescope (command palette) sources                 |
| `MarkdownRenderer`    | Markdown-to-React rendering pipeline                |
| `ApplicationDelegate` | Platform-specific application delegate              |

### Commands

| Type                        | Description                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------- |
| `EnvironmentCommands`       | Commands on the global scope (`core:new-note`, `core:open-note`, etc.)                |
| `WindowCommands`            | Window management commands (`window:reload`, `window:close`, etc.)                    |
| `ApplicationCommands`       | Application-level commands (`application:quit`, `application:open-preferences`, etc.) |
| `EditorCommands`            | Editor component commands (`core:save-note`, `editor:insert-images`, etc.)            |
| `MDECommands`               | Markdown editor global commands (`editor:focus-mde`, `editor:add-extension`, etc.)    |
| `MDELocalCommands`          | Markdown editor local commands (cursor movement, text formatting, etc.)               |
| `MDEPreviewCommands`        | Preview pane commands                                                                 |
| `FindInNoteGlobalCommands`  | Find/replace commands (global)                                                        |
| `NoteListBarLayoutCommands` | Note list navigation commands                                                         |
| `SidebarMenuCommands`       | Sidebar commands                                                                      |
| `MainLayoutCommands`        | Layout toggle commands                                                                |
| `EditorViewMode`            | Editor view mode union type (`'preview' \| 'sideBySide' \| 'edit'`)                   |

### IPC (Inter-Process Communication)

| Type               | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `IPCLocalDatabase` | Local PouchDB database access (notes, books, tags, files) |
| `IPCWindow`        | Window management                                         |
| `IPCDialog`        | Native dialog access                                      |
| `IPCClipboard`     | Clipboard access                                          |

### `'inkdrop'` module types

| Type                                              | Description           |
| ------------------------------------------------- | --------------------- |
| `ModelNote`, `ModelBook`, `ModelTag`, `ModelFile` | ORM model classes     |
| `Logger`                                          | Logger interface      |
| `NoteExportHelper`, `NoteExporter`                | Note export utilities |
| `NoteImportHelper`, `NoteImporter`                | Note import utilities |
| `UseModalResult`, `ModalState`                    | Modal hook types      |

## Dependencies

This package depends on the following for their type definitions. Inkdrop provides these at runtime -- plugins should externalize them in their bundler config:

- `@codemirror/commands`, `@codemirror/language`, `@codemirror/search`, `@codemirror/state`, `@codemirror/view`
- `inkdrop-model`
- `redux`
- `glob`

## Links

- [Inkdrop Plugin Development Guide](https://developers.inkdrop.app/)
- [Inkdrop SDK Repository](https://github.com/inkdropapp/sdk)
