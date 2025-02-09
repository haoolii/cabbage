import { ImageResolve } from "@/components/image/imageResolve";
import { ImagePreivew } from "@/components/ImagePreview";
import { PasswordResolve } from "@/components/resolve/passwordResolve";
import { getRecordDetail } from "@/request/requests";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UniqueId({
  params,
}: {
  params: Promise<{ uniqueId: string }>;
}) {
  const { uniqueId } = await params;

  const cookie = await cookies();

  const getRecordDetailJson = await getRecordDetail(
    uniqueId,
    cookie.get("Authorization")?.value
  );

  if (getRecordDetailJson.data.record.type === "url") {
    const urls = getRecordDetailJson.data.record.urls;
    if (urls?.length) {
      redirect(urls[0].content);
    }
  }

  console.log('Hello')

  // 並非 private 且需要密碼
  if (
    !getRecordDetailJson.data.tokenVerified &&
    getRecordDetailJson.data.record.passwordRequired
  ) {
    return (
      <PasswordResolve
        uniqueId={uniqueId}
        record={getRecordDetailJson.data.record}
      />
    );
  }

  return (
    <>
      <ImageResolve record={getRecordDetailJson?.data?.record} token={getRecordDetailJson.data.token} />
    </>
  );
}
