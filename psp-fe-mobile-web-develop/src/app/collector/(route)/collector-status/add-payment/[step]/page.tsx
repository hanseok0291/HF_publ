import AddPaymentStepClient from "./_components/AddPaymentStepClient";

export default async function Page({
  params
}: {
  params: Promise<{ step: string }>;
}) {
  const step = (await params).step;
  return <AddPaymentStepClient step={step} />;
}
