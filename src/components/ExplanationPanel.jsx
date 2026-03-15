import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ExplanationPanel({ history }) {
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
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Code Explanations
        </Typography>

        {history.length === 0 && (
          <Typography color="text.secondary">
            Your explanations will appear here.
          </Typography>
        )}

        {history.map((item) => (
          <Box key={item.id} mb={4}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              mb={1}
              color="primary"
            >
              Code
            </Typography>

            <SyntaxHighlighter
              language={item.language}
              style={materialDark}
              customStyle={{
                borderRadius: "8px",
                padding: "16px",
                fontSize: "13px",
              }}
            >
              {item.code}
            </SyntaxHighlighter>
            
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              mt={2}
              mb={1}
              color="primary"
            >
              Explanation
            </Typography>

            <Box
              sx={{
                background: "#f9fafb",
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography
                sx={{
                  whiteSpace: "pre-line",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                {item.explanation}
              </Typography>
            </Box>

            <Divider sx={{ mt: 3 }} />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default ExplanationPanel;
