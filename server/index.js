require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require("@google/genai");
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Initialize GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI('AIzaSyCNkpGuRfzLaqRrrSa5Hu0wqxwDg53yzmQ');

// Configure Multer for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to parse JSON request bodies (still useful for description if sent as JSON alongside FormData)
app.use(express.json());
// Middleware to parse URL-encoded bodies (useful if description is sent as a simple form field)
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ message: "Express server is running!" });
});

// Updated POST endpoint /api/analyze-food to handle multipart/form-data
app.post('/api/analyze-food', upload.array('images', 5), async (req, res) => {
  console.log('POST /api/analyze-food endpoint hit');
  console.log('req.body:', req.body);
  console.log('req.files:', req.files ? req.files.length + ' files' : '0 files');

  const { description } = req.body;

  // Validate input: must have description or at least one image
  if (!description && (!req.files || req.files.length === 0)) {
    return res.status(400).json({ error: 'Please provide a food description or at least one image.' });
  }

  try {
    const imageParts = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        imageParts.push({
          inlineData: {
            data: file.buffer.toString('base64'),
            mimeType: file.mimetype,
          },
        });
      }
    }

    // Construct prompt parts for Gemini
    const promptParts = [];
    if (description) {
      promptParts.push(description); // Add text description if provided
    }
    if (imageParts.length > 0) {
      promptParts.push(...imageParts); // Add image parts if provided
    }
    
    // If only description, promptParts = [description]
    // If only images, promptParts = [imagePart1, imagePart2, ...]
    // If both, promptParts = [description, imagePart1, imagePart2, ...]

    // Select the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const generatedText = await response.text();

    res.json({ analysis: generatedText });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Check for specific Gemini error types if needed, or send a generic error
    if (error.message && error.message.includes("SAFETY")) {
        return res.status(400).json({ error: 'The provided content was blocked due to safety concerns. Please try different input.' });
    }
    res.status(500).json({ error: 'Failed to analyze food content.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
