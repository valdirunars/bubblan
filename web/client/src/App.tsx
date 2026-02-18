import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<{ message: string } | null>(null);
  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <div>
        <h1>App</h1>
        {data && <p>{data.message}</p>}
      </div>
    </>
  );
}

export default App;
