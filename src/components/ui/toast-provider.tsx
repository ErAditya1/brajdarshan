"use client";

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

type ToastItem = {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
};

const ToastContext = React.createContext<
  (toast: Omit<ToastItem, "id">) => void
>(() => {});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const addToast = React.useCallback(
    ({ title, description, duration = 3000 }: Omit<ToastItem, "id">) => {
      const id = crypto.randomUUID();

      setToasts((prev) => [...prev, { id, title, description, duration }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={addToast}>
      <Toast.Provider swipeDirection="right">
        {children}

        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            className="
              grid grid-cols-[1fr_auto]
              gap-3 rounded-lg bg-background p-4 shadow-lg
              data-[state=open]:animate-in
              data-[state=closed]:animate-out
              data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)
            "
            open
          >
            <div>
              {toast.title && (
                <Toast.Title className="font-medium">
                  {toast.title}
                </Toast.Title>
              )}
              {toast.description && (
                <Toast.Description className="text-sm text-muted-foreground">
                  {toast.description}
                </Toast.Description>
              )}
            </div>

            <Toast.Close className="text-sm text-muted-foreground hover:text-foreground">
              ✕
            </Toast.Close>
          </Toast.Root>
        ))}

        <Toast.Viewport className="fixed bottom-4 right-4 z-9999 flex w-90 max-w-[100vw] flex-col gap-2 outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export const useToast = () => React.useContext(ToastContext);
