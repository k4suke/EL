export default async function handler(req, res) {
    const { message } = req.body;
    const API_KEY = process.env.OPENAI_API_KEY;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            })
        });

        const data = await response.json();
        res.status(200).json({ 
            reply: data.choices[0].message.content 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
