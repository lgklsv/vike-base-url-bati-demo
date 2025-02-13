import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { baseServer } from "../base";

export function Link({ href, children }: { href: string; children: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;

  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);

  href = baseServer + href;
  href = normalize(href);
  return (
    <a href={href} className={isActive ? "is-active" : undefined}>
      {children}
    </a>
  );
}

function normalize(url: string) {
  return "/" + url.split("/").filter(Boolean).join("/");
}
