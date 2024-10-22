import { ForumProvider } from "@/context/ForumProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ForumProvider>{children}</ForumProvider>;
}
