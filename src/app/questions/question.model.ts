export interface Question {
    text: string;
    options: Option[];
}

export interface Option {
    value: string;
    text: string;
}