import env from "@/core/env";
import { createApi } from "./util";

const base = `${env.CLIENT_API_BASE}/d`;

const paths = {
  postAssetUpload: "/asset/upload",
  postRecordUrl: "/record/url",
  postRecordImage: "/record/image",
  postRecordMedia: "/record/media",
  getQueryRecord: "/record/:uniqueId",
  postRecordPassword: "/record/:uniqueId/password",
};

export const api = createApi(paths, base);
