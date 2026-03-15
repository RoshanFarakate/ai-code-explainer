import { useState } from "react";
import { Typography, Box } from "@mui/material";

import CodeInput from "./components/CodeInput";
import ExplanationPanel from "./components/ExplanationPanel";

function App() {
  const [history, setHistory] = useState([]);

  const handleExplanation = (codeValue, result, language) => {
    const newEntry = {
      id: Date.now(),
      code: codeValue,
      explanation: result,
      language,
    };

    setHistory((prev) => [newEntry, ...prev]);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f4f6f8",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          textAlign: "center",
          py: 2,
          background: "linear-gradient(90deg,#1976d2,#42a5f5)",
          color: "white",
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          AI Code Explainer
        </Typography>

        <Typography variant="body2">
          Understand Python & JavaScript code instantly
        </Typography>
      </Box>

      {/* Main Layout */}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          gap: 3,
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <CodeInput onExplain={handleExplanation} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <ExplanationPanel history={history} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
