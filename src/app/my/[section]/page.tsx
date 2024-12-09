import { notFound } from "next/navigation";

import { Account } from "@/src/pages/account";

export default async function SectionPage(props: {
  params: Promise<{ section: string }>;
}) {
  const params = await props.params;
  const { section } = params;

  if (section === "profile") {
    return <h1>Профиль</h1>;
  } else if (section === "orders") {
    return <Account />;
  } else {
    notFound();
  }
}
