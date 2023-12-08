"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isMounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider {...props}>
      {!isMounted ? (
        <span className="loading loading-spinner text-primary w-8 h-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      ) : (
        children
      )}
    </NextThemesProvider>
  );
}
