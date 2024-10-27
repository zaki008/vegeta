"use client";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";

interface RootLayoutProps {
  children: React.ReactNode;
}

const Provider: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
};

export default Provider;
