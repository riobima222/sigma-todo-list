import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sigma - Login",
  description: "before you can use these application, you need to login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
