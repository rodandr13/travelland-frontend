import { notFound } from "next/navigation";

import { Account } from "@/src/pages/account";

export default function SectionPage({
  params,
}: {
  params: { section: string };
}) {
  const { section } = params;

  if (section === "profile") {
    return <h1>Профиль</h1>;
  } else if (section === "orders") {
    return <Account />;
  } else {
    notFound();
  }
}
