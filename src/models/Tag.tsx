export type Tag = {
    id: number;
    name: string;
    slug?: string;
    post_count?: number; // Changed to number if it's supposed to be a count
    created_at?: string;
    updated_at?: string;
};
