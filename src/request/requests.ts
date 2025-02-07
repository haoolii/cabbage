import { api } from "./endpoint";
import {
  GetRecordApiResponse,
  PostGetRecordDetailBody,
  PostImageRecordBody,
  PostMediaRecordBody,
  PostRecordApiResponse,
} from "./types";
import { replacePathParams } from "./util";

export const postAssetUpload = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(api.postAssetUpload, {
    method: "POST",
    body: formData,
  });

  return response;
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

  return response;
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

  return response;
};

export const postRecordMedia = async (body: PostMediaRecordBody) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const url = api.postRecordMedia;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const json = await response.json();

  return json;
};

export const getRecordDetail = async (uniqueId: string) => {
  const url = replacePathParams(api.getQueryRecord, { uniqueId });

  const response = await fetch(url, {
    method: "GET",
  });

  const json = (await response.json()) as GetRecordApiResponse;

  return json;
};

export const postGetRecordDetail = async (
  uniqueId: string,
  body: PostGetRecordDetailBody
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const url = replacePathParams(api.postGetQueryRecord, { uniqueId });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const json = (await response.json()) as PostRecordApiResponse;

  return json;
};
