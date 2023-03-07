import { useEffect } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

const useFB = () => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);
};

export default useFB;
