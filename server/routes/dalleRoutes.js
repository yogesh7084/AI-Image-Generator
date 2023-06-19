const express = require('express');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send("Hello from DALL-E api");
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        // console.log("prompt fetched ", prompt);

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        // console.log("creater aiResponse", aiResponse);

        const image = aiResponse.data.data[0].b64_json;
        // console.log("Generated image  ");

        res.status(200).json({ photo: image });

    } catch (error) {
        // console.log("error?.response.data.error.message");
        // console.log(error?.response.data.error.message);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
})

module.exports = router;