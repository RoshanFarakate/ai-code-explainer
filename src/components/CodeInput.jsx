import { useState } from "react";
import OpenAI from "openai";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";

// Initialize the OpenAI client with the OpenRouter API endpoint and API key
// Note: The API key is loaded from environment variables for security which is stored in the .env file and accessed via import.meta.env
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

function CodeInput({ onExplain }) {

  // State variables to manage the code input, selected language, and loading state
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);

  //  This is the function that gets called when the user clicks the "Explain Code" button. 
  // It sends the code and selected language to the OpenAI API and retrieves an explanation.
  const handleExplain = async () => {
    if (!code.trim()) return;

    setLoading(true);

    try {
      const completion = await client.chat.completions.create({
        model: "stepfun/step-3.5-flash:free", // Using a specific model from OpenRouter
        messages: [ 
          {
            role: "user",
            content: ` You are a senior software engineer. 
            Explain the following ${language} code clearly and concisely.
            Follow this EXACT format:
            Purpose:
              - Describe the overall goal of the code in 1 bullet point.
            Logic:
              - Explain the key steps or functions used in the code.
              - Mention loops, conditions, or important operations if present.
            
            Complexity:
              - Time Complexity: Analyze the algorithmic time complexity if possible.
              - Space Complexity: Analyze the memory usage if possible.
          
            Rules:
              - Keep explanations simple and beginner friendly.
              - Use bullet points only.
              - Do not repeat the code.
              - If complexity cannot be determined, write "Not clearly determinable".
            CODE:
              ${code}
            `,
            // The prompt is designed to instruct the model to provide a structured explanation of the code, 
            // including its purpose, logic, and complexity, while adhering to specific formatting rules.
            // This is done to reduce ambiguity and ensure that the output is clear.
          },
        ],
      });

      // If no explanation is generated, we provide a default message to avoid returning undefined or an empty string.
      const explanation =
        completion.choices?.[0]?.message?.content ||
        "No explanation generated.";

      onExplain(code, explanation, language);

      setCode("");
    } catch (error) {
      console.error(error);
      alert("Error generating explanation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        height: "75vh",
        overflow: "auto",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Code Input
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <TextField
            select
            label="Language"
            value={language}
            size="small"
            sx={{ minWidth: 140 }}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={handleExplain}
            disabled={!code.trim() || loading}
            sx={{
              borderRadius: "20px",
              px: 3,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Explain Code"
            )}
          </Button>
        </Box>

        <TextField
          multiline
          rows={18}
          fullWidth
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              fontFamily: "monospace",
              fontSize: "14px",
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
              borderRadius: 2,
              padding: 1,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default CodeInput;
