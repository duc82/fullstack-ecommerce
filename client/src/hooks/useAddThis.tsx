import { useEffect } from "react";

declare global {
  interface Window {
    addthis: any;
  }
}

const useAddThis = () => {
  useEffect(() => {
    if (window.addthis) {
      window.addthis.layers.refresh();
    }
  }, []);
};

export default useAddThis;
