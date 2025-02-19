import { api } from "./endpoint";
import {
  GetRecordApiResponse,
  GetRecordCountApiResponse,
  PostAssetUploadResponse,
  PostImageRecordBody,
  PostMediaRecordBody,
  PostRecordImageResponse,
  PostRecordMediaResponse,
  PostRecordPasswordApiResponse,
  PostRecordPasswordBody,
  PostRecordUrlResponse,
} from "./types";
import { replacePathParams } from "./util";
// import axios from 'axios';

export const postAssetUpload = async (files: File[]) => {
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append("files", file);
  });

  const response = await fetch(api.postAssetUpload, {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as PostAssetUploadResponse;

  return json;
};

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

  body.files?.forEach((file, index) => {
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

  body.files?.forEach((file, index) => {
    formData.append("files", file);
  });

  const response = await fetch(api.postRecordMedia, {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as PostRecordImageResponse;

  return json;
};

export const getRecordDetail = async (uniqueId: string, token?: string) => {
  const url = replacePathParams(api.getQueryRecord, { uniqueId });
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
  const url = replacePathParams(api.getQueryRecordCount, { uniqueId });
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
