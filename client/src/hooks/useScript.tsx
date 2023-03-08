import { useEffect, useState } from "react";

interface Options {
  type?: string;
  defer?: boolean;
  nonce?: string;
  async?: boolean;
}

const useScript = (url: string, options?: Options) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (url) {
      const script = document.createElement("script");

      script.src = url;
      if (options) {
        const { async, type, nonce, defer } = options;
        script.type = type || "";
        script.nonce = nonce || "";
        script.defer = defer || false;
        script.async = async || false;
      }

      document.body.appendChild(script);
      setIsLoaded(true);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [url, options]);

  return isLoaded;
};

export default useScript;
