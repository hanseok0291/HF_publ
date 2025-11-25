import { useCallback, useEffect } from "react";
import { mockApiResponse } from "@/app/constant/waste-sticker/MockApiResponse.data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import useChecked from "@/hooks/useChecked";

const CheckboxItem = ({
  text,
  amount,
  isChecked,
  onCheckChange,
  isTopCheckboxSelected
}: {
  text: string;
  amount?: string;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  isTopCheckboxSelected: boolean;
}) => (
  <div className="grid grid-cols-[1fr_60px] items-center">
    <div className="flex items-center gap-2">
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked) => onCheckChange(checked as boolean)}
      />
      <span className="text-sm">{text}</span>
    </div>
    <span className="text-sm text-center">{amount?.toLocaleString()}</span>
  </div>
);

export const TableAccordionMenu = ({
  onSelectionChange,
  currentData,
  isTopCheckboxSelected
}: {
  onSelectionChange: (hasSelectedItems: boolean) => void;
  currentData: any;
  isTopCheckboxSelected: boolean;
}) => {
  const { checkedState, setCheckedState, handleCheckChange } = useChecked();
  const hasCheckedItems = Object.values(checkedState).some(Boolean);

  useEffect(() => {
    onSelectionChange(hasCheckedItems);
  }, [hasCheckedItems, onSelectionChange]);

  const handleParentCheck = useCallback(
    (parentId: number, checked: boolean) => {
      const childUpdates = mockApiResponse.childItems
        .find((item) => item.parentId === parentId)
        ?.items.reduce(
          (acc, child) => ({
            ...acc,
            [`${parentId}-${child.id}`]: checked
          }),
          {}
        );

      setCheckedState((prev) => ({
        ...prev,
        [parentId]: checked,
        ...childUpdates
      }));
    },
    []
  );

  return (
    <div className="pr-[20px] w-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="border-0 w-full relative" value="item-1">
          <AccordionTrigger
            className={`p-0 max-w-[256px] text-[14px] ${hasCheckedItems ? "font-bold" : "font-normal"}`}
          >
            {currentData.topStandardName}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-4 mt-4">
              <li key={currentData.id} className="space-y-2">
                <div>
                  <CheckboxItem
                    text={currentData.middleStandardName}
                    isChecked={!!checkedState[currentData.id]}
                    onCheckChange={(checked) =>
                      handleParentCheck(currentData.id, checked)
                    }
                    isTopCheckboxSelected={isTopCheckboxSelected}
                  />
                </div>

                <ul className="pl-[20px] space-y-2">
                  <li key={currentData.id}>
                    <CheckboxItem
                      text={currentData.standardName}
                      amount={`${currentData.fee.toLocaleString()}`}
                      isChecked={
                        !!checkedState[`${currentData.id}-${currentData.id}`]
                      }
                      onCheckChange={(checked) =>
                        handleCheckChange(
                          `${currentData.id}-${currentData.id}`,
                          checked
                        )
                      }
                      isTopCheckboxSelected={isTopCheckboxSelected}
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TableAccordionMenu;
