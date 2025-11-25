import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, Ellipsis } from "lucide-react";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("cursor-pointer", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled = false,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "page" : "ghost",
        size
      }),
      disabled && "pointer-events-none cursor-not-allowed",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink> & {
  pageNumber: number;
};
const PaginationPrevious = ({
  pageNumber,
  onClick,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(
      "gap-1",
      pageNumber <= 1 ? "text-gray60 cursor-not-allowed" : "hover:bg-[#dfdfdf]"
    )}
    {...props}
    onClick={onClick}
  >
    <ChevronLeftIcon height={4} width={4} />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & {
  pageNumber: number;
  totalPages: number;
};

const PaginationNext = ({
  pageNumber,
  totalPages,
  onClick,
  ...props
}: PaginationNextProps) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      "gap-1",
      pageNumber == totalPages
        ? "text-gray60 cursor-not-allowed"
        : "hover:bg-[#dfdfdf]"
    )}
    onClick={onClick}
    {...props}
  >
    <ChevronRightIcon height={4} width={4} />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <Ellipsis height={4} width={4} />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};
