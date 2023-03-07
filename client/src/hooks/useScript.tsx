import { useEffect } from "react";

interface Options {
  type?: string;
  defer?: boolean;
  crossorigin?: "anonymous" | "use-credentials";
  nonce?: string;
  async?: boolean;
}

const useScript = (url: string, options?: Options) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    if (options) {
      const { async, type, nonce, crossorigin, defer } = options;
      script.type = type || "";
      script.nonce = nonce || "";
      script.crossOrigin = crossorigin || "";
      script.defer = defer || false;
      script.async = async || false;
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url, options]);
};

export default useScript;
