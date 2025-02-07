import env from "@/core/env";
import { createApi } from "./util";

const base = `${env.CLIENT_API_BASE}/d`;

const paths = {
  postAssetUpload: "/asset/upload",
  postRecordUrl: "/record/url",
  postRecordImage: "/record/image",
  postRecordMedia: "/record/media",
  getQueryRecord: "/record/:uniqueId",
  postGetQueryRecord: "/record/:uniqueId",
};

export const api = createApi(paths, base);
