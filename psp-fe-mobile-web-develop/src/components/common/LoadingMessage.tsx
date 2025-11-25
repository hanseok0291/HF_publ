import Loading from "@/app/loading";
import ArrowHeader from "../header/ArrowHeader";
import MainContainer from "./MainContainer";

export default function LoadingMessage({
  title,
  content = "로딩중...",
  isArrowHeader = true
}: {
  title: string;
  content?: string;
  isArrowHeader?: boolean;
}) {
  return (
    <MainContainer>
      {isArrowHeader && <ArrowHeader headerTitle={title} />}
      <div className="flex justify-center items-center h-[calc(100vh-56px)]">
        {content}
      </div>
      <Loading />
    </MainContainer>
  );
}
