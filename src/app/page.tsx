import { HomePage } from "@/src/pages/homePage";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("server render");
  return <HomePage />;
}
