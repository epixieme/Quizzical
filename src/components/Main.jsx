export default function Main({ start, mainScreen }) {
  return <main className={!start ? "main" : "questions"}>{mainScreen}</main>
}
