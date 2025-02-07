import { PasswordInput } from "@/components/passwordInput";
import { getRecordDetail } from "@/request/requests";
import { cookies } from "next/headers";

export default async function UniqueId({
  params,
}: {
  params: Promise<{ uniqueId: string }>;
}) {
  const { uniqueId } = await params;

  // const cookieStore = await cookies();

  const getRecordDetailJson = await getRecordDetail(uniqueId);

  // cookieStore.set("Authorization", getRecordDetailJson.data.token);

  if (getRecordDetailJson.data.record.passwordRequired) {
    return (
      <div>
        <PasswordInput uniqueId={uniqueId} />
        <img src="http://localhost:3000/o/eaaf9a9b-9d03-4cf9-b276-f61283167ee3.png" />
      </div>
    );
  }

  // TODO:

  return (
    <>
      <h1>UniqueId: {uniqueId}</h1>
      <div>
        {(getRecordDetailJson?.data?.record?.assets || []).map((asset) => {
          return (
            <div key={asset.filename}>
              <img src={`http://localhost:3000/o/${asset.filename}`} />
            </div>
          );
        })}
      </div>
    </>
  );
}
