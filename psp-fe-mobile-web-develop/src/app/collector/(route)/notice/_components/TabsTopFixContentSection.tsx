import { TabsTopFixContentSectionType } from "@/types/store/etc/notice/Notice.type";

export default function TabsTopFixContentSection({
  contents
}: TabsTopFixContentSectionType) {
  const displayTitle =
    contents.length > 35
      ? `${contents.substring(0, 35)}\n${contents.substring(35)}`
      : contents;

  return (
    <p className="text-[0.875rem]" style={{ whiteSpace: "pre-wrap" }}>
      {displayTitle}
    </p>
  );
}
