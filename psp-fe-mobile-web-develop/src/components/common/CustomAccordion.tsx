import { CustomAccordionType } from "@/types/components/common/CommonComponents.type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";

export default function CustomAccordion({
  trigger,
  content
}: CustomAccordionType) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent className="flex justify-between">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
