import { redirect } from "next/navigation";

export default function Root() {
  redirect("/de"); // or "/en"
}
