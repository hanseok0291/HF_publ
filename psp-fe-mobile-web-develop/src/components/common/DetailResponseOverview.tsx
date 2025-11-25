export default function DetailResponseOverview({
  title,
  response
}: {
  title: string;
  response: number | string | null;
}) {
  return (
    <div>
      <span className="text-[12px] inline-block mb-[8px] text-gray80">
        {title}
      </span>
      <p className="text-[14px] font-normal">{response ?? "-"}</p>
    </div>
  );
}
