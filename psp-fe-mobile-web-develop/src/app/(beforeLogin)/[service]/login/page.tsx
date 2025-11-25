import { ServiceTypeSchema } from "@/types/Route.type";
import { redirect } from "next/navigation";
import PageClient from "@/components/login/PageClient";

const Page = async ({ params }: { params: Promise<{ service: string }> }) => {
  const service = (await params).service;

  if (!ServiceTypeSchema.safeParse(service).success) {
    redirect("/");
  }

  return <PageClient service={service} />;
};

export default Page;
