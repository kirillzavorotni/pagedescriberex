/* eslint-disable */
const { Router } = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const he = require('he');
const iconv = require('iconv-lite'); // Import iconv-lite
const jschardet = require('jschardet'); // Import jschardet

const router = Router();

const LANGUAGE = 'русском';

const PROMPT = ''
    + `Дай менее детальную выжимку на ${LANGUAGE} языке из этого текста по каждому из логически отделенного раздела этого текста и `
    + 'c необходимыми подробностями и с выделенем основных (возможно важных) элементов в этом тексте:';

router.post(
    '/',
    async (req, res) => {
        const pageUrl = req.body.pageUrl;

        const response = await axios({
            method: 'get',
            url: pageUrl || 'https://google.com',
            responseType: 'arraybuffer', // Set the responseType to 'arraybuffer'
            responseEncoding: 'binary', // Set the responseEncoding to 'binary'
        }).catch((error) => {
            console.error(error);
        });

        // Detect encoding using jschardet
        const detectedEncoding = jschardet.detect(response.data).encoding;

        // Convert the response to the detected encoding using iconv-lite
        const decodedResponseData = iconv.decode(response.data, detectedEncoding);

        let cheerioAPI = cheerio.load(decodedResponseData);
        cheerioAPI('script').remove(); // Remove script tags and their content
        cheerioAPI('style').remove(); // Remove style tags and their content
        cheerioAPI('iframe').remove(); // Remove iframe tags and their content
        let html = cheerioAPI.html(); // Get the remaining HTML content as a string

        // Remove all HTML tags using a regular expression
        let text = html.replace(/<[^>]*>/g, '');
        // Decode HTML entities
        let decodedText = he.decode(text);
        // Remove extra spaces, line breaks, and other whitespace characters
        let clearText = decodedText.replace(/\s+/g, ' ').trim();

        cheerioAPI = cheerio.load(clearText);
        cheerioAPI('script').remove(); // Remove script tags and their content
        cheerioAPI('style').remove(); // Remove style tags and their content
        cheerioAPI('iframe').remove(); // Remove iframe tags and their content
        html = cheerioAPI.html(); // Get the remaining HTML content as a string

        // Remove all HTML tags using a regular expression
        text = html.replace(/<[^>]*>/g, '');
        // Decode HTML entities
        decodedText = he.decode(text);
        // Remove extra spaces, line breaks, and other whitespace characters
        clearText = decodedText.replace(/\s+/g, ' ').trim();

        res.status(200);
        res.send(`${PROMPT}\n"${clearText}"`);
    },
);

module.exports = router;




