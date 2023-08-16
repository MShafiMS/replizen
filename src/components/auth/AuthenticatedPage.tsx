import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function AuthenticatedPage(
  props: PropsWithChildren<Record<string, unknown>>
) {
  const router = useRouter();
  const { authState } = useContext(UserContext);
  const { children } = props;

  useEffect(() => {
    if (authState === "unauthenticated") {
      router.replace("/auth");
    }
  }, [authState, router]);

  return <div>{children}</div>;
}
