import { useState } from "react";
import { Light as SyntaxHighLight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "./App.css";
import { requestToGroqAI } from "./utils/groq";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const ai = await requestToGroqAI(document.getElementById('content').value);
    setTimeout(() => {
      setData(ai);
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto">
      <h1 className="text-4xl text-indigo-500">FAQ Anti-Hoax Sains </h1>
      <form className="flex flex-col gap-4 py-4 w-full">
        <input
          placeholder="ketik permintaan disini..." 
          className="py-2 px-4 text-md rounded-md"
          id="content"
          type="text"
        />
        <button 
          onClick={handleSubmit}
          type="button"
          className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Kirim"}
        </button>
      </form>
      <div className="max-w-xl w-full mx-auto">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : data ? (
          <SyntaxHighLight 
            language="swift" 
            style={darcula} 
            wrapLongLines={true}
          >
            {data}
          </SyntaxHighLight>
        ) : null}
      </div>
    </main>
  );
}

export default App;
