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
      router.push({ pathname: "/auth", query: { pathName: router.asPath } });
    }
  }, [authState, router]);

  return <div>{children}</div>;
}
