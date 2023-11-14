export interface Question {
    id: number;
    text: string;
    options: Option[];
}

export interface Option {
    value: string;
    text: string;
}