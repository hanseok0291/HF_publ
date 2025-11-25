import { AddAdminPowerDataType } from "@/types/store/employee/AddAdminPower.type";
import { getMenuAll } from "@/apis/common/commonApis";

interface MenuResponse {
  menuId: string;
  menuName: string;
  inquiryYn: boolean;
  editYn: boolean;
  children?: MenuResponse[];
}

interface ApiResponse {
  code: number;
  message: string;
  content: MenuResponse[];
}

export async function getMenuData(): Promise<AddAdminPowerDataType[]> {
  try {
    // API call would go here
    // const response: ApiResponse = await fetch("/apis/menus").then((res) =>
    //   res.json()
    // );
    const response = await getMenuAll();
    console.log(response);
    if (response.code !== 0) {
      throw new Error(response.message);
    }

    return getData(response.content);
  } catch (error) {
    console.error("Failed to fetch menu data:", error);
    return [];
  }
}

function getData(apiMenus: MenuResponse[]): AddAdminPowerDataType[] {
  return apiMenus.map((menu) => ({
    menuName: menu.menuName,
    type: menu.children && menu.children.length > 0 ? "accordion" : "text",
    menuItems: menu.children
      ? [
          {
            title: menu.menuName,
            headerCheckboxes: [
              {
                id: `${menu.menuId}-inquiry`,
                label: "조회 권한",
                checked: menu.inquiryYn
              },
              {
                id: `${menu.menuId}-edit`,
                label: "수정 권한",
                checked: menu.editYn
              }
            ],
            subItems: menu.children.map((child) => ({
              label: child.menuName,
              checkboxes: [
                {
                  id: `${child.menuId}-inquiry`,
                  label: "조회 권한",
                  checked: child.inquiryYn
                },
                {
                  id: `${child.menuId}-edit`,
                  label: "수정 권한",
                  checked: child.editYn
                }
              ]
            }))
          }
        ]
      : []
  }));
}

export default getMenuAll;
