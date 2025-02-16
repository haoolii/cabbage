export type ApiResponse<T> = {
  message: string;
  data: T;
  code: string;
};

export type PostAssetUploadResponse = ApiResponse<{
  assetIds: string[];
}>;

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

export type PostRecordPasswordBody = {
  password: string;
};

export type PostRecordPasswordApiResponse = ApiResponse<{
  token: string;
}>;
