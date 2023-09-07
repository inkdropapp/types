import type { TagsActionType } from '../actions/tags';
import type { Tag } from '@inkdropapp/model-private';
export type TagsState = {
    all: Tag[];
    hash: Record<string, Tag>;
    lastUpdatedAt: number;
};
export declare const initialTagsState: TagsState;
export default function tags(state: TagsState | undefined, action: TagsActionType): TagsState;
