export default function DetailRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-gray80 text-[12px] font-medium">{label}</p>
      <p className="text-black text-[12px] font-normal">{value}</p>
    </div>
  );
}
