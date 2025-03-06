export type ApiResponse<T> = {
  message: string;
  data: T;
  code: string;
};

export type PostRecordImageResponse = ApiResponse<{
  uniqueId: string;
}>;

export type PostRecordMediaResponse = ApiResponse<{
  uniqueId: string;
}>;

export type PostRecordUrlResponse = ApiResponse<{
  uniqueId: string;
}>;

export type Record = {
  uniqueId: string;
  type: string;
  prompt: string;
  passwordRequired: boolean;
  createdAt: string;
  assets?: Array<{
    key: string;
  }>;
  urls?: Array<{
    content: string,
  }>
};

export type GetRecordApiResponse = ApiResponse<{
  record: Record;
  token: string;
  tokenVerified: boolean;
}>;

export type GetRecordCountApiResponse = ApiResponse<{
  count: number;
}>;

export type PostMediaRecordBody = {
  prompt?: string;
  password?: string;
  passwordRequired: boolean;
  expireIn: number;
  files?: File[];
  captchaToken: string;
};

export type PostRecordPasswordBody = {
  password: string;
  captchaToken: string;
};

export type PostRecordPasswordApiResponse = ApiResponse<{
  token: string;
}>;


export type PostImageRecordBody = {
  prompt?: string;
  password?: string;
  passwordRequired: boolean;
  expireIn: number;
  files?: File[]
  captchaToken: string;
};