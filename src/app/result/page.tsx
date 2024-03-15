import { LayoutProvider } from "@/app/_component";
import { ResultContent } from "@/app/_component";
import RedirectToRoot from "../_component/RedirectToRoot";

export default function Result() {
  return (
    <LayoutProvider>
      <ResultContent />
      <RedirectToRoot />
    </LayoutProvider>
  );
}
