/* eslint-disable */

// const puppeteer = require('puppeteer');

// const LANGUAGE = 'русском';
//
// const PROMPT = ''
//     + `Дай менее детальную выжимку на ${LANGUAGE} языке из этого текста по каждому из логически отделенного раздела этого текста и `
//     + 'c необходимыми подробностями и с выделенем основных (возможно важных) элементов в этом тексте:';

const getUrlSummary = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('done');
        }, 500);
    });

    // try {
    //     const browser = await puppeteer.launch({
    //         headless: false,
    //         defaultViewport: null,
    //     });
    //     const [page] = await browser.pages();
    //     await page.setViewport({ width: 1920, height: 1080 });
    //
    //     await page.goto(url, { waitUntil: "domcontentloaded" });
    //
    //     page.on('error', (err) => {
    //         console.error('Page error:', err);
    //         browser.close();
    //         res.sendStatus(500);
    //     });
    //
    //     page.on('pageerror', (err) => {
    //         console.error('Page error:', err);
    //         browser.close();
    //         res.sendStatus(500);
    //     });
    //
    //     const textContent = await page.evaluate(() => {
    //         return document.querySelector('body').innerText;
    //     });
    //
    //     await browser.close();
    //
    //     res.json({ textContent });
    // } catch (err) {
    //     console.error('Error:', err);
    //     res.sendStatus(500);
    // }
};

module.exports = {
    getUrlSummary,
};
