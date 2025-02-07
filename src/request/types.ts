export type ApiResponse<T> = {
  message: string;
  data: T;
  code: string;
};

export type GetRecordApiResponse = ApiResponse<{
  record: {
    uniqueId: string;
    type: string;
    prompt: string;
    passwordRequired: boolean;
    createdAt: string;
    assets?: Array<{
        filename: string;
      }>;
  };
  token: string;
}>;

export type PostRecordApiResponse = ApiResponse<{
    record: {
        uniqueId: string;
        type: string;
        prompt: string;
        passwordRequired: boolean;
        createdAt: string;
        urls: Array<string>;
        assets: Array<{
          filename: string;
        }>;
    },
    token: string;
}>;

export type PostImageRecordBody = {
  prompt?: string;
  password?: string;
  passwordRequired: boolean;
  expireIn: number;
  assetIds: string[];
};

export type PostMediaRecordBody = {
  prompt?: string;
  password?: string;
  passwordRequired: boolean;
  expireIn: number;
  assetIds: string[];
};

export type PostGetRecordDetailBody = {
  password: string;
};
