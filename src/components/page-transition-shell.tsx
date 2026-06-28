"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type PageTransitionShellProps = {
  children: React.ReactNode;
};

export function PageTransitionShell({ children }: PageTransitionShellProps) {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);
  const currentChildrenRef = useRef(children);
  const [exitingStage, setExitingStage] = useState<React.ReactNode | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useLayoutEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    const previousScrollRestoration = window.history.scrollRestoration;
    const shouldRestoreTop = !window.location.hash;
    let userInterruptedScroll = false;
    let nestedScrollFrame = 0;
    const scrollSettleTimers: number[] = [];
    const scrollTop = () => {
      if (!shouldRestoreTop || userInterruptedScroll) return;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    const stopRouteScrollRestore = () => {
      userInterruptedScroll = true;
      scrollSettleTimers.forEach((timer) => window.clearTimeout(timer));
      if (nestedScrollFrame) {
        window.cancelAnimationFrame(nestedScrollFrame);
      }
    };

    root.dataset.routeHydrating = "true";
    root.style.scrollBehavior = "auto";
    window.history.scrollRestoration = "manual";
    scrollTop();

    const scrollFrame = window.requestAnimationFrame(() => {
      scrollTop();
      nestedScrollFrame = window.requestAnimationFrame(scrollTop);
    });
    scrollSettleTimers.push(
      ...[60, 160, 320, 640].map((delay) => window.setTimeout(scrollTop, delay)),
    );
    window.addEventListener("wheel", stopRouteScrollRestore, { passive: true });
    window.addEventListener("touchmove", stopRouteScrollRestore, { passive: true });
    window.addEventListener("keydown", stopRouteScrollRestore);

    const clearHydrationFlag = window.setTimeout(() => {
      delete root.dataset.routeHydrating;
      root.style.scrollBehavior = previousScrollBehavior;
      window.history.scrollRestoration = previousScrollRestoration;
    }, 900);

    return () => {
      window.cancelAnimationFrame(scrollFrame);
      if (nestedScrollFrame) {
        window.cancelAnimationFrame(nestedScrollFrame);
      }
      scrollSettleTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(clearHydrationFlag);
      window.removeEventListener("wheel", stopRouteScrollRestore);
      window.removeEventListener("touchmove", stopRouteScrollRestore);
      window.removeEventListener("keydown", stopRouteScrollRestore);
      delete root.dataset.routeHydrating;
      root.style.scrollBehavior = previousScrollBehavior;
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [pathname]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      previousPathnameRef.current = pathname;
      currentChildrenRef.current = children;
      return;
    }

    setExitingStage(currentChildrenRef.current);
    currentChildrenRef.current = children;
    previousPathnameRef.current = pathname;
    setIsTransitioning(true);

    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
      setExitingStage(null);
    }, 760);

    return () => {
      window.clearTimeout(timer);
    };
  }, [children, pathname]);

  return (
    <div className={`route-shell ${isTransitioning ? "route-shell--transitioning" : ""}`}>
      <div aria-hidden="true" className="route-transition-veil" />
      {exitingStage ? (
        <div aria-hidden="true" className="route-stage route-stage--exit">
          {exitingStage}
        </div>
      ) : null}
      <div key={pathname} className="route-stage route-stage--enter">
        {children}
      </div>
    </div>
  );
}
