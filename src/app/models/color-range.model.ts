export interface ColorRange {
    id?: number;
    metric: string;
    green: {start: number, end: number};
    yellow: {start: number, end: number};
    red: {start: number, end: number};
}