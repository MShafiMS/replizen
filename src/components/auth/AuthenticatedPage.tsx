import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthenticatedPage(
  props: PropsWithChildren<Record<string, unknown>>
) {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  const { children } = props;

  useEffect(() => {
    if (authState === "unauthenticated") {
      router.replace("/auth");
    }
  }, [authState, router]);

  return <div>{children}</div>;
}
