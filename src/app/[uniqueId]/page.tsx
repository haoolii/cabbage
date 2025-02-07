export default async function UniqueId({
  params,
}: {
  params: Promise<{ uniqueId: string }>;
}) {
  const { uniqueId } = await params;

  return (
    <>
      <h1>UniqueId: {uniqueId}</h1>
    </>
  );
}
