import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A letter for you",
  description: "Open your secret letter with the password.",
};

export default function LetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
