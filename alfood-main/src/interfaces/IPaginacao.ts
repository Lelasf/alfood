export interface Ipaginacao<T> {
    count: number,
    next: string,
    previous: string,
    results: T[]
}