import env from "@/core/env";
import { createApi } from "./util";

const base = `${env.SERVER_API_BASE}/api`;

const paths = {
  getConfigs: "/config/list",
  postRecordUrl: "/record/url",
  postRecordImage: "/record/image",
  postRecordMedia: "/record/media",
  getQueryRecord: "/record/:uniqueId",
  getQueryRecordCount: "/record/:uniqueId/count",
  postRecordPassword: "/record/:uniqueId/password",
};

export const api = createApi(paths, base);

const containerBase = `${env.SERVER_API_CONTAINER_BASE}/api`;

export const containerApi = createApi(paths, containerBase);
