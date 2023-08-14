import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function UnauthenticatedPage(
  props: PropsWithChildren<Record<string, unknown>>
) {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  const { children } = props;

  useEffect(() => {
    if (authState === "authenticated") {
      router.replace("/");
    }
  }, [authState, router]);

  return <div>{children}</div>;
}
