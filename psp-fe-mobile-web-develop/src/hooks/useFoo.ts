import { useEffect, useState } from "react";

export default function useFoo() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(open);
  }, [open]);
  return {
    open,
    setOpen,
    handleClick
  };
}
