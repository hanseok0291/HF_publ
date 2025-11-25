"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { TypeOf } from "zod";
import { AUTHOR_ENUM } from "@/enums/Common.enum";

const useAuthorPath = () => {
  const pathName = usePathname();

  // NOTE: authorPath가 올바르지 않는 경우 middlware에서 자동으로 리디렉션 시키므로 authorPath는 항상 존재한다.
  const authorPath = useMemo(() => {
    const [firstPath] = pathName.split("/").filter(Boolean);
    return AUTHOR_ENUM.safeParse(firstPath).success ? firstPath : undefined;
  }, [pathName]);

  return authorPath as TypeOf<typeof AUTHOR_ENUM>;
};

export default useAuthorPath;
