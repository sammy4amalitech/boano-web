export type TimelogEntry = {
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    source: string;
};

export type TimelogResponse = {
    thoughts: string;
    response: TimelogEntry[];
};