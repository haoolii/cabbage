export type PostImageRecordBody = {
    prompt?: string;
    password?: string;
    passwordRequired: boolean;
    expireIn: number;
    assetIds: string[]
}

export type PostMediaRecordBody = {
    prompt?: string;
    password?: string;
    passwordRequired: boolean;
    expireIn: number;
    assetIds: string[]
}

export type PostGetRecordDetailBody = {
    password: string;
}