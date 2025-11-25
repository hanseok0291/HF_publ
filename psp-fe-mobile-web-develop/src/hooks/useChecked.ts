import { CheckedStateType } from "@/types/store/waste-sticker/AccordionMenu.type";
import { useCallback, useState } from "react";

export default function useChecked() {
  const [checkedState, setCheckedState] = useState<CheckedStateType>({});
  const handleCheckChange = useCallback(
    (id: string | number, checked: boolean) => {
      setCheckedState((prev) => ({ ...prev, [id]: checked }));
    },
    []
  );

  return {
    checkedState,
    setCheckedState,
    handleCheckChange
  };
}
