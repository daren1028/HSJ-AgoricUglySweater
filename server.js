const path = require("path");
const express = require("express");
const multer = require("multer");
const { google } = require("googleapis");
require('dotenv').config();

const app = express();
const port = 80;

// Set up Multer storage
const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: function (req, file, cb) {
        cb(null, "canvas_image_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve HTML files
app.use(express.static("public"));
app.use(express.json());

// Google Sheets API credentials
const credentials = require("./auth/credentials.json");
const { file } = require("googleapis/build/src/apis/file");
const sheets = google.sheets({ version: "v4", auth: getAuthorizedClient() });

// Handle POST request for file upload
app.post("/submit", upload.single("file"), async (req, res) => {
    try {
        const email = req.body.email;
        const twitter = req.body.twitter;
        const filename = req.file.filename;
        const fullpath = req.get('Referer') + "/uploads/" + filename;

        await appendDataToSheet([[email, twitter, fullpath]]);

        res.send("File uploaded and data added to Google Sheet successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Function to append data to a specific Google Sheets
async function appendDataToSheet(data) {
    const spreadsheetId = process.env.SPREADSHEET_ID; // Replace with your Google Sheets ID
    const range = `${process.env.SHEET_NAME}!A1:C1`; // Update sheet name and range as needed

    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: "USER_ENTERED",
            resource: { values: data },
        });

        console.log("Data appended to Google Sheets:", response.data);
    } catch (error) {
        console.error("Error appending data to Google Sheets:", error);
    }
}

// Function to authorize Google Sheets API
function getAuthorizedClient() {
    const { client_email, private_key } = credentials;
    const auth = new google.auth.JWT({
        email: client_email,
        key: private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return auth;
}