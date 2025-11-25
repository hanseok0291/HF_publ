import { TabsTopFixType } from "@/types/store/etc/notice/Notice.type";
import TabsTopFixContent from "@/components/common/TabsTopFixContent";
import { TabsContent } from "@/components/ui/tabs";

export default function TabsTopFix({ clickDetail }: TabsTopFixType) {
  return (
    <>
      {clickDetail && (
        <TabsContent value="all">
          <TabsTopFixContent />
        </TabsContent>
      )}
      {clickDetail && (
        <TabsContent value="hecto">
          <TabsTopFixContent />
        </TabsContent>
      )}
      {clickDetail && (
        <TabsContent value="government">
          <TabsTopFixContent />
        </TabsContent>
      )}
    </>
  );
}
