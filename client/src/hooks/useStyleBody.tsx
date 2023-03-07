import { useEffect } from "react";

interface StyleBodyProps {
  active: boolean;
  className: string;
}

const useStyleBody = ({ active, className }: StyleBodyProps) => {
  useEffect(() => {
    document.body.className = active ? className : "";
  }, [active, className]);
};

export default useStyleBody;
