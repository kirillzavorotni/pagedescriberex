/* eslint-disable */

// const LANGUAGE = 'русском';
//
// const PROMPT = ''
//     + `Дай менее детальную выжимку на ${LANGUAGE} языке из этого текста по каждому из логически отделенного раздела этого текста и `
//     + 'c необходимыми подробностями и с выделенем основных (возможно важных) элементов в этом тексте:';

const puppeteer = require('puppeteer');
const { SystemError } = require('./error/errorModule');

const getPageTextContent = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });
    const [page] = await browser.pages();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    page.on('error', (err) => {
        browser.close();
        throw new SystemError(`Page error while try to go: "${url}"`, err);
    });

    page.on('pageerror', (err) => {
        browser.close();
        throw new SystemError(`Page error while try to go: "${url}"`, err);
    });

    const textContent = await page.evaluate(() => document.querySelector('body').innerText);

    await browser.close();

    return textContent;
};

const getUrlSummary = async (url) => {
    const pageText = await getPageTextContent(url);

    return pageText;
};

module.exports = {
    getUrlSummary,
};
