import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center">
      <h4 className="text-2xl">잘못된 경로 입니다.</h4>
      <Link href={"/"} className="text-fail underline">
        홈 화면으로 돌아가기
      </Link>
    </section>
  );
}
