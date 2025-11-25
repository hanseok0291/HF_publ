import ArrowHeader from "../header/ArrowHeader";
import MainContainer from "./MainContainer";

export default function ErrorMessage({ title }: { title: string }) {
  return (
    <MainContainer>
      <ArrowHeader headerTitle={title} />
      <div className="flex justify-center items-center h-[calc(100vh-56px)]">
        데이터를 불러올 수 없습니다.
      </div>
    </MainContainer>
  );
}
