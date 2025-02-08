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
      <h1>UniqueId: {uniqueId}</h1>
      <pre>{JSON.stringify(getRecordDetailJson, null, 2)}</pre>
      <div>
        {(getRecordDetailJson?.data?.record?.assets || []).map((asset) => {
          return (
            <ImagePreivew
              key={asset.filename}
              filename={asset.filename}
              token={getRecordDetailJson.data.token}
            />
          );
        })}
      </div>
    </>
  );
}
