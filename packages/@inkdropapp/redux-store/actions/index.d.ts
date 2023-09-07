import * as notes from './notes';
import * as books from './books';
import * as tags from './tags';
import * as db from './db';
import * as config from './config';
import * as session from './session';
import * as queryContext from './query-context';
import * as editingNote from './editing-note';
import * as editor from './editor';
import * as navigation from './navigation';
import * as sidebar from './sidebar';
import * as searchBar from './search-bar';
import * as stats from './stats';
import * as assistiveError from './assistive-error';
declare const _default: {
    notes: typeof notes;
    books: typeof books;
    tags: typeof tags;
    db: typeof db;
    config: typeof config;
    session: typeof session;
    queryContext: typeof queryContext;
    editingNote: typeof editingNote;
    editor: typeof editor;
    navigation: typeof navigation;
    sidebar: typeof sidebar;
    searchBar: typeof searchBar;
    stats: typeof stats;
    assistiveError: typeof assistiveError;
};
export default _default;