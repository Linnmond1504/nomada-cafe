import { getMenuData } from "@/lib/getMenu";
import MenuClient from "@/components/MenuClient";

export const revalidate = 60;

export default async function Page() {
  const items = await getMenuData();
  return <MenuClient items={items} />;
}
