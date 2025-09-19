import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-up or Sign-in",
  description: "Authentication pages for NoteHub",
};
type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <>{children}</>;
}
