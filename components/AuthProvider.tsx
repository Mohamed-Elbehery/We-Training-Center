"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const AuthProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SessionProvider session={session}>
      {!isMounted ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner text-primary w-10 h-10"></span>
        </div>
      ) : (
        children
      )}
    </SessionProvider>
  );
};

export default AuthProvider;
