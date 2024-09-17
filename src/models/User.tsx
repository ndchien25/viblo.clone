export type User = {
    id: number;
    username: string;
    display_name: string;
    fullname?: string;
    email: string;
    email_verified_at?: Date;
    avatar?: string;
    role_id: number;
    address?: string;
    phone?: string;
    university?: string;
    followers_count?: number;
    following_count?: number;
    total_view?: number;
    bookmark_count?: number;
    created_at?: Date;
    updated_at?: Date;
};
