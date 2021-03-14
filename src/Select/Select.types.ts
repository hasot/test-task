export type SelectOption = {
    title: string;
    year: number;
}

export enum EStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type IAsyncData<T> =
    | {
    status: EStatus.IDLE | EStatus.LOADING | EStatus.ERROR;
    data: T;
}
    | { status: EStatus.SUCCESS; data: T };
