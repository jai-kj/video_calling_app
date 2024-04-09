"use client";

import { Call, StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Button from "./Button";

interface IFloatingBrowserWindowProps {
  children: React.ReactNode;
  call: Call;
  title?: string;
  width?: number;
  height?: number;
}

const FloatingBrowserWindow = ({
  children,
  call,
  title = "Floating window",
  width = 400,
  height = 316,
}: IFloatingBrowserWindowProps) => {
  const [windowOpen, setWindowOpen] = useState<boolean>(false);
  const [newWindow, setNewWindow] = useState<Window | null>(null);

  useEffect(() => {
    const handleWindowClose = () => setWindowOpen(false);

    if (newWindow) {
      newWindow.addEventListener("unload", handleWindowClose);
    }

    return () => {
      if (newWindow) {
        newWindow.removeEventListener("unload", handleWindowClose);
      }
    };
  }, [newWindow]);

  const handleWindowAction = () => {
    if (newWindow && !newWindow.closed) {
      newWindow.close();
      setWindowOpen(false);
      return;
    }

    const windowInstance = window.open(
      "",
      "_blank",
      `width=${width},height=${height}`,
    );
    if (windowInstance) {
      const newWindowDocument = windowInstance.document;
      newWindowDocument.title = title;

      const linkElements = document.querySelectorAll("link[rel='stylesheet']");
      linkElements.forEach((link) => {
        const linkClone = newWindowDocument.createElement("link");
        linkClone.href = link.getAttribute("href") || "";
        linkClone.rel = "stylesheet";
        newWindowDocument.head.appendChild(linkClone);
      });

      const rootContainer = newWindowDocument.createElement("div");
      rootContainer.id = "window-root";
      rootContainer.style.width = "100%";
      rootContainer.style.height = "100%";

      newWindowDocument.body.appendChild(rootContainer);

      const reactRoot = ReactDOM.createRoot(rootContainer);
      reactRoot.render(
        <StreamCall call={call}>
          <StreamTheme>{children}</StreamTheme>
        </StreamCall>,
      );

      setNewWindow(windowInstance);
      setWindowOpen(true);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleWindowAction}
      className="mx-auto mt-6 hidden xl:block"
    >
      {windowOpen ? "Close Floating Window" : "Open Floating Window"}
    </Button>
  );
};

export default FloatingBrowserWindow;
