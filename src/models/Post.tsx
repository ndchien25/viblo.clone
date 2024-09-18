import { Tag } from "./Tag";
import { User } from "./User";

export type Post = {
    id: number;
    user_id: number;
    serie_id?: number;
    organ_id?: number;
    title?: string;
    content?: string;
    slug: string;
    status: string;
    schedule_at?: Date;
    publish_at?: Date;
    view_count?: number;
    vote?: number;
    created_at?: Date;
    updated_at?: Date;
    comment_count: number;
    tags? : Tag[]
    user: User;
};
