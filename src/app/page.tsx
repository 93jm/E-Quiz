import ActiveButton from "./_component/ActiveButton";
import LayoutProvider from "./_component/LayoutProvider";

export default function Home() {
  return (
    <LayoutProvider>
      <h1>English Quiz</h1>
      <ActiveButton type={"Main"} />
    </LayoutProvider>
  );
}
