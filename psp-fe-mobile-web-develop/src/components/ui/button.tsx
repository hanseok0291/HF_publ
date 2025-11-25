import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#3C7CFD] text-white text-center leading-normal hover:bg-[#7AA8FF]",
        black: "bg-black text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "text-center border border-black bg-[#FFF] text-[#222] hover:bg-[#F6F9FF] hover:border-[#3C7CFD]",
        borderOutline:
          "border rounded-full border-[#DDD] hover:border-[#3C7CFD] hover:text-[#3C7CFD] text-[#A5A5A5] ",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        selectedPagination: "text-black border border-[#DDD]",
        selectedDay: "text-black",
        ghost: "text-[#A5A5A5]",
        link: "text-primary underline-offset-4 hover:underline",
        page: "text-[#222] hover:font-bold",
        cancel:
          "flex justify-center items-center p-[12px_48px] bg-gray40 border-[0px]",
        horizontal: "text-black border"
      },
      size: {
        default: "p-[0.5rem_2rem] font-bold text-[1.25rem] ",
        sm: "p-[0.9rem_3rem] text-[0.875rem] font-semibold",
        md: "p-[0.75rem_1rem] text-[0.875rem] font-semibold",
        outline: "p-[0.5rem_2rem] text-[0.875rem]",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        region: "text-left h-full px-[1vw] w-[12vw]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
