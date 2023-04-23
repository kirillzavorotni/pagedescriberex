/* eslint-disable */
const { Router } = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const he = require('he');

const router = Router();

const PROMPT = ''
    + 'Дай менее детальную выжимку из этого текста по каждому из логически отделенного раздела этого текста и '
    + 'c необходимыми подробностями и с выделенем основных (возможно важных) элементов в этом тексте:';

router.get(
    '/',
    async (req, res) => {
        const response = await axios({
            method: 'get',
            url: 'https://www.onliner.by/',
        }).catch((error) => {
            console.error(error);
        });

        const cheerioAPI = cheerio.load(response.data);
        cheerioAPI('script').remove(); // Remove script tags and their content
        cheerioAPI('style').remove(); // Remove style tags and their content
        cheerioAPI('iframe').remove(); // Remove iframe tags and their content
        const html = cheerioAPI.html(); // Get the remaining HTML content as a string

        // Remove all HTML tags using a regular expression
        const text = html.replace(/<[^>]*>/g, '');
        // Decode HTML entities
        const decodedText = he.decode(text);
        // Remove extra spaces, line breaks, and other whitespace characters
        const clearText = decodedText.replace(/\s+/g, ' ').trim();

        res.status(200);
        res.send(clearText);
    },
);

module.exports = router;




