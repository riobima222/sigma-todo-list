import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sigma - Register",
  description: "if you don't have account, you can register here",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
