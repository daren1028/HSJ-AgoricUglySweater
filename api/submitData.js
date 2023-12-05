module.exports = async (req, res) => {
    const fetch = require('node-fetch');

    const googleScriptURL = 'https://script.google.com/macros/s/AKfycby2cmOP3yphJd_qJkGgM2-jnHSmU6NxlSPqM5H8_5fHrUCKdMjorXCAPTXqEOX6Lwc2dA/exec';
    console.log(googleScriptURL);

    try {
        const response = await fetch(googleScriptURL, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        console.log("data:", data)
        res.status(200).json(data);
    } catch (error) {
        console.log("error:", error)
        res.status(500).json({ error: error.message });
    }
};
