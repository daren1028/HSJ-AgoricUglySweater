module.exports = async (req, res) => {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

    try {
        const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.text();
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in serverless function');
    }
};
