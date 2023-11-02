"use client";

/** @packages */
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

/** @scripts */
import { store } from "@/core/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
}
