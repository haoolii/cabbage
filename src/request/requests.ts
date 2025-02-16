import { api } from "./endpoint";
import {
  GetRecordApiResponse,
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

export const postRecordUrl = async (content: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const url = api.postRecordUrl;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      content,
    }),
  });

  const json = await response.json() as PostRecordUrlResponse;

  return json;
};

export const postRecordImage = async (body: PostImageRecordBody) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const url = api.postRecordImage;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const json = (await response.json()) as PostRecordImageResponse;

  return json;
};

export const postRecordMedia = async (body: PostMediaRecordBody) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const url = api.postRecordMedia;
  console.log('urll', url)
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const json = await response.json() as PostRecordMediaResponse;

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
