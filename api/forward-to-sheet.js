import fetch from 'node-fetch';

module.exports = async (req, res) => {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyTBSZele7wYHYVKqPivUYIq1o8qBW_DFIzE-nzVaBq8iBchKMJG6Wg3H8dkqHD0oM/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
    });

    const data = await response.text();
    res.status(200).send(data);
};
