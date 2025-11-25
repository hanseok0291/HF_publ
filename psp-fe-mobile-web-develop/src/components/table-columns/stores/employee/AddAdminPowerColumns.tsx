import {
  CheckboxCellProps,
  MenuResponse
} from "@/types/store/employee/AddAdminPower.type";
import { useFormContext } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useOpenAccordion } from "@/stores/useOpenAccordion";

const MenuCell = ({ menu }: { menu: MenuResponse }) => {
  const { openMenus, toggleMenu } = useOpenAccordion();
  const isOpen = openMenus.has(menu.menuName);

  if (!menu.children?.length) {
    return <span>{menu.menuName}</span>;
  }

  return (
    <section className="w-full">
      <div
        className="flex items-center justify-between gap-2 cursor-pointer"
        onClick={() => toggleMenu(menu.menuName)}
      >
        <span>{menu.menuName}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && menu.children && (
        <div className="pl-6 mt-2 space-y-2">
          {menu.children.map((child) => (
            <ul key={child.menuId} className="flex items-center">
              <li className="text-sm list-disc">{child.menuName}</li>
            </ul>
          ))}
        </div>
      )}
    </section>
  );
};

const CheckboxCell = ({ row, type }: CheckboxCellProps) => {
  const { openMenus } = useOpenAccordion();
  const isOpen = openMenus.has(row.original.menuName);
  const { watch, setValue } = useFormContext();

  // 현재 메뉴의 상태를 계산하는 함수
  const getMenuState = (menuId: string, stateType: "inquiryYn" | "editYn") => {
    const menuList = watch("menuList") || [];
    const menuItem = menuList.find((item: any) => item.menuId === menuId);
    return menuItem ? menuItem[stateType] : false;
  };

  // menuList 배열 내에서 현재 메뉴의 인덱스를 찾는 함수
  const findMenuIndex = (menuId: string) => {
    const menuList = watch("menuList") || [];
    return menuList.findIndex((item: any) => item.menuId === menuId);
  };

  // 부모 id를 가져오는 함수
  const findParentId = (menuId: string) => {
    const currentId = findMenuIndex(menuId);
    const menuList = watch("menuList") || [];
    return menuList[currentId].parentMenuId;
  };

  const handleParentChange = (checked: boolean, menuId: string) => {
    const menuList = watch("menuList") || [];
    const parentIndex = findMenuIndex(menuId);
    let updatedMenuList = [...menuList];

    // 편집 권한이 체크되면 조회 권한도 자동 체크
    if (type === "edit" && checked) {
      // 부모 메뉴 업데이트
      if (parentIndex === -1) {
        // menuList에 새로운 항목 추가
        updatedMenuList = [
          ...updatedMenuList,
          {
            menuId,
            inquiryYn: true, // 조회 권한 자동 체크
            editYn: checked
          }
        ];
      } else {
        // 기존 항목 업데이트
        updatedMenuList[parentIndex] = {
          ...updatedMenuList[parentIndex],
          editYn: checked,
          inquiryYn: true // 조회 권한 자동 체크
        };
      }

      // 자식 메뉴들도 같은 상태로 업데이트
      row.original.children?.forEach((child) => {
        const childIndex = findMenuIndex(child.menuId);
        if (childIndex === -1) {
          updatedMenuList = [
            ...updatedMenuList,
            {
              menuId: child.menuId,
              inquiryYn: true, // 조회 권한 자동 체크
              editYn: checked
            }
          ];
        } else {
          updatedMenuList[childIndex] = {
            ...updatedMenuList[childIndex],
            editYn: checked,
            inquiryYn: true // 조회 권한 자동 체크
          };
        }
      });
    }
    // 조회 권한이 해제되면 편집 권한도 자동 해제
    else if (type === "search" && !checked) {
      // 부모 메뉴 업데이트
      if (parentIndex === -1) {
        // menuList에 새로운 항목 추가
        updatedMenuList = [
          ...updatedMenuList,
          {
            menuId,
            inquiryYn: checked,
            editYn: false // 편집 권한 자동 해제
          }
        ];
      } else {
        // 기존 항목 업데이트
        updatedMenuList[parentIndex] = {
          ...updatedMenuList[parentIndex],
          inquiryYn: checked,
          editYn: false // 편집 권한 자동 해제
        };
      }

      // 자식 메뉴들도 같은 상태로 업데이트
      row.original.children?.forEach((child) => {
        const childIndex = findMenuIndex(child.menuId);
        if (childIndex === -1) {
          updatedMenuList = [
            ...updatedMenuList,
            {
              menuId: child.menuId,
              inquiryYn: checked,
              editYn: false // 편집 권한 자동 해제
            }
          ];
        } else {
          updatedMenuList[childIndex] = {
            ...updatedMenuList[childIndex],
            inquiryYn: checked,
            editYn: false // 편집 권한 자동 해제
          };
        }
      });
    }
    // 일반적인 경우의 업데이트
    else {
      // 부모 메뉴 상태 업데이트
      if (parentIndex === -1) {
        // menuList에 새로운 항목 추가
        updatedMenuList = [
          ...updatedMenuList,
          {
            menuId,
            [type === "search" ? "inquiryYn" : "editYn"]: checked
          }
        ];
      } else {
        // 기존 항목 업데이트
        updatedMenuList[parentIndex] = {
          ...updatedMenuList[parentIndex],
          [type === "search" ? "inquiryYn" : "editYn"]: checked
        };
      }

      // 자식 메뉴들도 같은 상태로 업데이트
      row.original.children?.forEach((child) => {
        const childIndex = findMenuIndex(child.menuId);
        if (childIndex === -1) {
          updatedMenuList = [
            ...updatedMenuList,
            {
              menuId: child.menuId,
              [type === "search" ? "inquiryYn" : "editYn"]: checked
            }
          ];
        } else {
          updatedMenuList[childIndex] = {
            ...updatedMenuList[childIndex],
            [type === "search" ? "inquiryYn" : "editYn"]: checked
          };
        }
      });
    }

    // 모든 변경사항을 한 번에 업데이트
    setValue("menuList", updatedMenuList, { shouldValidate: true });
  };

  const handleChildChange = (checked: boolean, menuId: string) => {
    const menuList = watch("menuList") || [];
    const index = findMenuIndex(menuId);
    let updatedMenuList = [...menuList];

    // 편집 권한이 체크되면 조회 권한도 자동 체크
    if (type === "edit" && checked) {
      if (index === -1) {
        updatedMenuList = [
          ...updatedMenuList,
          {
            menuId,
            inquiryYn: true, // 조회 권한 자동 체크
            editYn: checked
          }
        ];
      } else {
        updatedMenuList[index] = {
          ...updatedMenuList[index],
          editYn: checked,
          inquiryYn: true // 조회 권한 자동 체크
        };
      }
    }
    // 조회 권한이 해제되면 편집 권한도 자동 해제
    else if (type === "search" && !checked) {
      if (index === -1) {
        updatedMenuList = [
          ...updatedMenuList,
          {
            menuId,
            inquiryYn: checked,
            editYn: false // 편집 권한 자동 해제
          }
        ];
      } else {
        updatedMenuList[index] = {
          ...updatedMenuList[index],
          inquiryYn: checked,
          editYn: false // 편집 권한 자동 해제
        };
      }
    }
    // 일반적인 경우의 업데이트
    else {
      if (index === -1) {
        updatedMenuList = [
          ...updatedMenuList,
          {
            menuId,
            [type === "search" ? "inquiryYn" : "editYn"]: checked
          }
        ];
      } else {
        updatedMenuList[index] = {
          ...updatedMenuList[index],
          [type === "search" ? "inquiryYn" : "editYn"]: checked
        };
      }
    }

    // 부모 체크박스 상태 업데이트
    const parentId = findParentId(menuId);
    if (!!parentId) {
      const parentIndex = findMenuIndex(parentId);
      const childMenus = updatedMenuList.filter(
        (item) => item.parentMenuId === parentId
      );

      const isCheckAllInq = childMenus.every((item) => item.inquiryYn);
      const isCheckAllEdit = childMenus.every((item) => item.editYn);

      updatedMenuList[parentIndex] = {
        ...updatedMenuList[parentIndex],
        inquiryYn: isCheckAllInq,
        editYn: isCheckAllEdit
      };
    }

    // 모든 변경사항을 한 번에 업데이트
    setValue("menuList", updatedMenuList, { shouldValidate: true });
  };

  if (!row.original.children?.length) {
    // 자식 없는 메뉴의 체크박스
    const isChecked =
      type === "search"
        ? getMenuState(row.original.menuId, "inquiryYn")
        : getMenuState(row.original.menuId, "editYn");

    return (
      <div className="flex justify-center">
        <Checkbox
          id={`${row.original.menuId}-${type}`}
          className="w-[20px] h-[20px]"
          checked={isChecked}
          onCheckedChange={(checked) =>
            handleParentChange(!!checked, row.original.menuId)
          }
          aria-label={`${row.original.menuName} ${
            type === "search" ? "조회" : "편집"
          }`}
        />
      </div>
    );
  }

  // 자식 있는 메뉴의 체크박스
  const parentIsChecked =
    type === "search"
      ? getMenuState(row.original.menuId, "inquiryYn")
      : getMenuState(row.original.menuId, "editYn");

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Checkbox
          id={`${row.original.menuId}-${type}`}
          className="w-[20px] h-[20px]"
          checked={parentIsChecked}
          onCheckedChange={(checked) =>
            handleParentChange(!!checked, row.original.menuId)
          }
          aria-label={`${row.original.menuName} ${
            type === "search" ? "조회" : "편집"
          }`}
        />
      </div>
      {isOpen && row.original.children && (
        <div className="mt-2 space-y-2">
          {row.original.children.map((child) => {
            // 각 자식 메뉴의 체크 상태
            const childIsChecked =
              type === "search"
                ? getMenuState(child.menuId, "inquiryYn")
                : getMenuState(child.menuId, "editYn");

            return (
              <div
                key={child.menuId}
                className="flex justify-center items-center"
              >
                <Checkbox
                  id={`${child.menuId}-${type}`}
                  className="w-[20px] h-[20px]"
                  checked={childIsChecked}
                  onCheckedChange={(checked) =>
                    handleChildChange(!!checked, child.menuId)
                  }
                  aria-label={`${child.menuName} ${
                    type === "search" ? "조회" : "편집"
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const columns: ColumnDef<MenuResponse, any>[] = [
  {
    accessorKey: "menuName",
    header: "메뉴명",
    cell: ({ row }) => <MenuCell menu={row.original} />
  },
  {
    id: "search",
    header: "조회",
    cell: ({ row }) => <CheckboxCell row={row} type="search" />,
    enableSorting: false,
    enableHiding: false
  },
  {
    id: "edit",
    header: "편집",
    cell: ({ row }) => <CheckboxCell row={row} type="edit" />,
    enableSorting: false,
    enableHiding: false
  }
];
