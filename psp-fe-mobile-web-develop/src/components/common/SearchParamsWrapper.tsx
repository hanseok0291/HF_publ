"use client";

import { ReactNode, Suspense } from "react";
import Loading from "@/app/loading";

interface SearchParamsWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SearchParamsWrapper({
  children,
  fallback = <div>로딩 중...</div>
}: SearchParamsWrapperProps) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
