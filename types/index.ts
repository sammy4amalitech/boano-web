export type TimelogEntry = {
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    source: string;
};

export type TimelogResponse = {
    thoughts: string;
    response: TimelogEntry &{
        id: string;
        created_at: string;
        updated_at: string;
}[],
    total_count: number;
    has_more: boolean;
    page: number;
    items_per_page: number;
};