import ContactDetailClient from "./_components/ContactDetailClient";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const jobInqId = (await params).id;
  return <ContactDetailClient jobInqId={jobInqId} />;
}
