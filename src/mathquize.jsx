import React, { useEffect, useState } from "react";

// --- Cookie Helpers ---
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=/";
}
function getCookie(name) {
  return document.cookie
    .split("; ")
    .map((c) => c.split("="))
    .find((pair) => pair && pair[0] === name)?.[1];
}
function deleteCookie(name) {
  setCookie(name, "", -1);
}

// --- Utility to create random math problem ---
function makeProblem(mode) {
  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  let question = "";
  let answer = 0;
  if (mode === "addition") {
    question = `${a} + ${b}`;
    answer = a + b;
  } else if (mode === "subtraction") {
    const [x, y] = a >= b ? [a, b] : [b, a];
    question = `${x} - ${y}`;
    answer = x - y;
  } else if (mode === "multiplication") {
    question = `${a} × ${b}`;
    answer = a * b;
  }
  return { question, answer };
}

export default function MathQuiz() {
  const [mode, setMode] = useState("addition");
  const [problem, setProblem] = useState(() => makeProblem("addition"));
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [username, setUsername] = useState("");

  // Load cookies on mount
  useEffect(() => {
    const savedName = getCookie("mathquiz_username");
    const savedScore = getCookie("mathquiz_score");
    if (savedName) setUsername(decodeURIComponent(savedName));
    if (savedScore) {
      try {
        const parsed = JSON.parse(decodeURIComponent(savedScore));
        if (parsed && typeof parsed.correct === "number") setScore(parsed);
      } catch {}
    }
  }, []);

  // Save cookies
  useEffect(() => {
    setCookie("mathquiz_score", encodeURIComponent(JSON.stringify(score)));
  }, [score]);
  useEffect(() => {
    if (username) setCookie("mathquiz_username", encodeURIComponent(username));
  }, [username]);

  function nextProblem(newMode) {
    const m = newMode || mode;
    setProblem(makeProblem(m));
    setInput("");
    setMessage("");
  }

  function handleSubmitAnswer(e) {
    e.preventDefault();
    const numeric = Number(input);
    if (Number.isNaN(numeric)) {
      setMessage("Please enter a number.");
      return;
    }
    const correct = numeric === problem.answer;
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }));
    setMessage(
      correct ? "✅ Correct!" : `❌ Wrong — answer is ${problem.answer}`
    );
    setTimeout(() => nextProblem(), 1000);
  }

  function handleModeChange(m) {
    setMode(m);
    nextProblem(m);
  }

  function resetProgress() {
    setScore({ correct: 0, total: 0 });
    deleteCookie("mathquiz_score");
    setMessage("Progress reset.");
  }

  function clearAllCookies() {
    deleteCookie("mathquiz_score");
    deleteCookie("mathquiz_username");
    setUsername("");
    setScore({ correct: 0, total: 0 });
    setMessage("Cleared username and score.");
  }

  const pct =
    score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-gray-100 font-sans p-6">
      <div className="max-w-xl w-full bg-neutral-900 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.2)] p-6">
        <h1 className="text-3xl font-bold mb-6 text-cyan-400 text-center">
          ⚡ Math Quiz
        </h1>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-400">
            Your name:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Mode buttons */}
        <div className="flex gap-2 justify-center mb-6">
          {["addition", "subtraction", "multiplication"].map((m) => (
            <button
              key={m}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === m
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/40"
                  : "bg-neutral-800 border border-cyan-700 hover:bg-cyan-600 hover:text-black"
              }`}
              onClick={() => handleModeChange(m)}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Problem display */}
        <div className="mb-5 text-center">
          <div className="text-lg text-gray-400">Question:</div>
          <div className="text-4xl font-bold my-3 text-cyan-300">
            {problem.question}
          </div>

          <form
            onSubmit={handleSubmitAnswer}
            className="flex gap-2 justify-center items-center"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your answer"
              className="px-4 py-2 rounded-lg bg-neutral-800 border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 w-32 text-center"
              inputMode="numeric"
            />
            <button className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 font-semibold">
              Submit
            </button>
            <button
              type="button"
              onClick={() => nextProblem()}
              className="px-4 py-2 border border-cyan-700 rounded-lg hover:bg-cyan-700"
            >
              Skip
            </button>
          </form>

          {message && (
            <div
              className={`mt-3 text-sm ${
                message.includes("Correct")
                  ? "text-green-400"
                  : message.includes("Wrong")
                  ? "text-red-400"
                  : "text-gray-400"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* Scoreboard */}
        <div className="border-t border-cyan-800 pt-4 mt-4">
          <div className="flex justify-between text-sm">
            <div>
              <div className="text-gray-400">Player</div>
              <div className="font-semibold text-cyan-300">
                {username || "(no name)"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">Score</div>
              <div className="font-semibold text-cyan-300">
                {score.correct} / {score.total} ({pct}%)
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3 justify-center">
            <button
              onClick={resetProgress}
              className="px-3 py-2 border border-cyan-700 rounded-lg hover:bg-cyan-700 text-sm"
            >
              Reset Progress
            </button>
            <button
              onClick={clearAllCookies}
              className="px-3 py-2 border border-red-700 rounded-lg hover:bg-red-700 text-sm"
            >
              Clear Cookies
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Your name & score are stored in cookies. Reload anytime to continue!
        </p>
      </div>
    </div>
  );
}
