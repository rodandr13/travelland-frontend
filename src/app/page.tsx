import { HomePage } from "@/src/pages/homePage";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <HomePage />;
}
