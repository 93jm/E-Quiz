import styles from "./layoutProvider.module.css";

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={styles.container}>{children}</section>;
}
