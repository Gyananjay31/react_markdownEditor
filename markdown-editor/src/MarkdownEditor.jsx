import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./index.css";

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!");
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState("both"); // 'write', 'preview', 'both'

  // Dark Mode toggle effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev); // Update darkMode state
  };

  const insertAtCursor = (before, after = "") => {
    const textarea = document.getElementById("markdown-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text =
      markdown.slice(0, start) +
      before +
      markdown.slice(start, end) +
      after +
      markdown.slice(end);
    setMarkdown(text);
  };

  const formattingButtons = [
    { label: "B", title: "Bold", action: () => insertAtCursor("**", "**") },
    { label: "I", title: "Italic", action: () => insertAtCursor("_", "_") },
    { label: "🔗", title: "Link", action: () => insertAtCursor("[Text](https://)") },
    { label: "🖼️", title: "Image", action: () => insertAtCursor("![alt](image-url)") },
    { label: "❝", title: "Quote", action: () => insertAtCursor("> ") },
    { label: "🔆", title: "Highlight", action: () => insertAtCursor("==", "==") }, // Custom syntax
  ];

  const downloadReadme = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    alert("Markdown copied!");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">📝 Markdown Editor</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-1 rounded bg-gray-800 text-white dark:bg-yellow-300 dark:text-black transition"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {["write", "preview", "both"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1 rounded ${
              mode === m ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {formattingButtons.map((btn) => (
          <button
            key={btn.title}
            title={btn.title}
            onClick={btn.action}
            className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-blue-500 hover:text-white"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {(mode === "write" || mode === "both") && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <textarea
              id="markdown-textarea"
              className="w-full h-[70vh] p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 resize-none"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>
        )}
        {(mode === "preview" || mode === "both") && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 overflow-auto">
            <div className="prose dark:prose-invert max-w-none h-[70vh] overflow-y-auto">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={downloadReadme}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          ⬇️ Download README.md
        </button>
        <button
          onClick={copyToClipboard}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
        >
          📋 Copy Markdown
        </button>
      </div>
    </div>
  );
}

export default MarkdownEditor;
