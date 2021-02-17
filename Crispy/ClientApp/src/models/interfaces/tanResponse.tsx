export interface TanError {
    code: string;
    description: string;
}

export default interface TanResponse {
    succeeded: boolean;
    errors: TanError[];
}