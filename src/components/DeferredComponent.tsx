import { PropsWithChildren, useEffect, useState } from "react";

interface Props extends PropsWithChildren {}

function DeferredComponent({ children }: Props) {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
}

export default DeferredComponent;
