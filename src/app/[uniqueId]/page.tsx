"use server";
import { ImageResolve } from "@/components/image/imageResolve";
import { MediaResolve } from "@/components/media/mediaResolve";
import { ExpiredNotFound } from "@/components/resolve/expiredNotFound";
import { PasswordResolve } from "@/components/resolve/passwordResolve";
import { getRecordCount, getRecordDetail } from "@/request/requests";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UniqueId({
  params,
}: {
  params: Promise<{ uniqueId: string }>;
}) {
  try {
    const { uniqueId } = await params;

    const cookie = await cookies();

    const getRecordDetailJson = await getRecordDetail(
      uniqueId,
      cookie.get("Authorization")?.value || ""
    );

    const countJson = await getRecordCount(uniqueId);

    const type = getRecordDetailJson?.data?.record?.type;

    if (type === "url") {
      const urls = getRecordDetailJson?.data?.record?.urls || [];
      if (urls?.length) {
        redirect(urls[0].content);
      }
    }

    // expired or not exist
    if (!getRecordDetailJson?.data) {
      return (
        <>
          <ExpiredNotFound />
        </>
      );
    }

    // 並非 private 且需要密碼
    if (
      !getRecordDetailJson.data.tokenVerified &&
      getRecordDetailJson.data.record.passwordRequired
    ) {
      return (
        <>
          <PasswordResolve
            uniqueId={uniqueId}
            record={getRecordDetailJson.data.record}
          />
        </>
      );
    }

    if (type === "media") {
      return (
        <>
          <MediaResolve
            record={getRecordDetailJson?.data?.record}
            token={getRecordDetailJson.data.token}
            count={countJson.data.count || 0}
          />
        </>
      );
    }

    return (
      <>
        <ImageResolve
          record={getRecordDetailJson?.data?.record}
          token={getRecordDetailJson.data.token}
          count={countJson.data.count || 0}
        />
      </>
    );
  } catch (err) {
    if (
      typeof err === "object" &&
      err !== null &&
      "digest" in err &&
      typeof err.digest === "string" &&
      err.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }

    return (
      <h1>Error</h1>
    );
  }
}
