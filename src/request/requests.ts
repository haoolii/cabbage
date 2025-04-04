import { api, containerApi } from "./endpoint";
import {
  GetConfigsApiResponse,
  GetRecordApiResponse,
  GetRecordCountApiResponse,
  PostImageRecordBody,
  PostMediaRecordBody,
  PostMediaRecordV2SSEResponse,
  PostRecordImageResponse,
  PostRecordMediaResponse,
  PostRecordPasswordApiResponse,
  PostRecordPasswordBody,
  PostRecordUrlResponse,
} from "./types";
import { replacePathParams } from "./util";
import axios from "axios";

export const postRecordUrl = async ({
  content,
  captchaToken,
}: {
  content: string;
  captchaToken: string;
}) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const url = api.postRecordUrl;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      content,
      captchaToken,
    }),
  });

  const json = (await response.json()) as PostRecordUrlResponse;

  return json;
};

export const postRecordImage = async (body: PostImageRecordBody) => {
  const formData = new FormData();
  formData.append("expireIn", `${body.expireIn}`);
  formData.append("prompt", body.prompt || "");
  formData.append("password", body.password || "");
  formData.append("passwordRequired", `${body.passwordRequired}`);
  formData.append("captchaToken", `${body.captchaToken}`);

  body.files?.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(api.postRecordImage, {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as PostRecordImageResponse;

  return json;
};

export const postRecordMedia = async (body: PostMediaRecordBody) => {
  const formData = new FormData();
  formData.append("expireIn", `${body.expireIn}`);
  formData.append("prompt", body.prompt || "");
  formData.append("password", body.password || "");
  formData.append("passwordRequired", `${body.passwordRequired}`);
  formData.append("captchaToken", `${body.captchaToken}`);

  body.files?.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(api.postRecordMedia, {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as PostRecordMediaResponse;

  return json;
};

export const postRecordMediaV2 = async (
  body: PostMediaRecordBody,
  onServerProgress: (data: PostMediaRecordV2SSEResponse) => void,
  onUploadProgress: (percentage: number) => void
) => {
  const formData = new FormData();
  formData.append("expireIn", `${body.expireIn}`);
  formData.append("prompt", body.prompt || "");
  formData.append("password", body.password || "");
  formData.append("passwordRequired", `${body.passwordRequired}`);
  formData.append("captchaToken", `${body.captchaToken}`);

  let totalSize = 0;
  body.files?.forEach((file) => {
    formData.append("files", file);
    totalSize += file.size;
  });
  onUploadProgress(0);

  await axios.post(api.postRecordMediaV2, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent?.total) {
        onUploadProgress(progressEvent.loaded / progressEvent?.total);
      }
    },
    responseType: "stream", // 處理 SSE
    onDownloadProgress: progressEvent => {
      const xhr = progressEvent.event.target
      const { responseText } = xhr
      const text = responseText;
      text.split("\n").forEach((line: string) => {
        if (line.startsWith("data:")) {
          const data = JSON.parse(line.replace("data: ", ""));

          onServerProgress(data);
        }
      });
   }
  });
};
export const getRecordDetail = async (uniqueId: string, token?: string) => {
  // TODO: 調整containerAPI & api 差異
  const url = replacePathParams(containerApi.getQueryRecord, { uniqueId });
  const response = await fetch(url, {
    method: "GET",
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  const json = (await response.json()) as GetRecordApiResponse;

  return json;
};

export const getRecordCount = async (uniqueId: string) => {
  // TODO: 調整containerAPI & api 差異
  const url = replacePathParams(containerApi.getQueryRecordCount, { uniqueId });
  const response = await fetch(url, {
    method: "GET",
  });

  const json = (await response.json()) as GetRecordCountApiResponse;

  return json;
};

export const postRecordPassword = async (
  uniqueId: string,
  body: PostRecordPasswordBody
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const url = replacePathParams(api.postRecordPassword, { uniqueId });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const json = (await response.json()) as PostRecordPasswordApiResponse;

  return json;
};

export const getServerConfigs = async () => {
  const response = await fetch(containerApi.getConfigs, {
    method: "GET",
  });

  const json = (await response.json()) as GetConfigsApiResponse;

  return json;
};

export const getConfigs = async () => {
  const response = await fetch(api.getConfigs, {
    method: "GET",
  });

  const json = (await response.json()) as GetConfigsApiResponse;

  return json;
};