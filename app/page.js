import dbConnect from "./lib/db"; 

await dbConnect(); 

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
}
