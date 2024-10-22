"use client";
import React, { useEffect } from "react";
import { testService } from "@/services";
import { useSession } from "next-auth/react";

const TestBackend = () => {
  const { data: session, status } = useSession();
  const [data, setData] = React.useState<any>(null);
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (session?.user.token === undefined) return; // Do nothing if not logged in
    const hello = async () => {
      const data = await testService(session?.user.token).firstTest();

      setData(data);
    };
    hello();
    return () => {};
  }, [status, session]);

  if (status === "loading") return <div>Loading...</div>;
  return <div>TestBackend {JSON.stringify(data)}</div>;
};

export default TestBackend;
