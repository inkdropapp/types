import type { Tag, TagColor } from '@inkdropapp/model-private';
import type { ThunkAction } from '../types';
export declare const TAGS_UPDATE = "TAGS_UPDATE";
export type TagsActionType = {
    type: 'TAGS_UPDATE';
    payload: {
        all: Tag[];
        hash: Record<string, Tag>;
    };
};
export declare function update(): ThunkAction<Promise<void>>;
export declare function changeTag(tag: Tag): ThunkAction<Promise<void>>;
export declare function createTag(name: string, color: TagColor, opts?: {
    showNotesAfterCreation?: boolean;
}): ThunkAction<Promise<Tag | undefined>>;
export declare function deleteTag(tagId: string): ThunkAction<Promise<void>>;
