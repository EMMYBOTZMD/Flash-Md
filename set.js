const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEMyYm1HYm9FQkVMS0dXNlgwNXB4QWw1dWJGaXl0M1k5b0tRbDh5eXZtYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlFhRzJzR1h6Z1lMSjlVLytIUzVtQ3JEVS9IWXdoWGZEUE9xYzkzaE5WOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QU9tMWR1M3UxRE1zZWE3K0xBWFRVVlpiMFNjUVhxYnZvNWNRTHNNYVVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYTTI4UXdsQjMwa1ljdFZpYmRnM3llODVRWUQ2bzJpRDNJeiszQTNjMVR3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFHMDVPOUZSMzRGNDh6QmRlZXBTWUJUVmpnVWJLajNpWnpGZFhPTjlqSEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdUbklURTUyNjFjdENwYnRiNG1HdWdFN1F6NFNYWW92bGxJWHVza0tWM2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUNvZm1nZXFDVEhyaEhjVU1DcWdzbjFoZ1ZyMnAvS0dTRlhCYnJodFlVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGtDMTQxTGRZVlFHbi9VcmIrd0tzbEgvbUluazVyQjBxWHloUmtHYSt4QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkwvS0VaREpveSsrY0VzSm9aT29sQm8zT25Janhlbys4L0R2bWd3cTFlUSt4a0NGRFdXK1hnT1JjcDJMdjFiYWJGQlhrdnlGVC81ODNERmw4V1B1aEFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiI5aXRwQ0FkWWNpQ3pveWdMNE5xdHRPYUtSRnR1US9LT25MejNXWE1PYm5vPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJheGlUY1k3S1FnZUlpZHkxVnpQRHd3IiwicGhvbmVJZCI6ImNhMTg1YjY5LTJiYTUtNGY3My05NGIxLTM3NWNlOTYxN2MzZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJybGdSekNJQjQ1VTdWM2IzUTg2WlN3R0Urd289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHhGemVpSkVtZzB6YmJpSXVTTEtnSWNsRU9nPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhTTUVMMlhYIiwibWUiOnsiaWQiOiIyMzQ5MTI3MjM3NTA2OjM0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNT042WVFHRUpyeGtiWUdHQ0lnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJteGJVb2JqNENURDRhd0F0YXRmeGJ0Vjd1K2JsUkVHQWIrRWNOSWZVSW1NPSIsImFjY291bnRTaWduYXR1cmUiOiJzanI3NW9sYnBLSlJaWjdyd045d0p0M3ZnKzQxMm16ay83NDBtNDlBY0Zqd3NmZlgydTNEOXN2MURraklZVjFGSTJwKys1OU9xWm1xZkRaVkFxZUlEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMGxBODlPMmtkS1doUXIyMkM1bkpwcFcvcENqQkFhVUt6S0ZGc0ZDUi9mTFNWT0hoTUJCejc2MEJwTHZhWGtmUmh2MWRFYnhEYXRWQ0JUUlBzTkxBQWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTI3MjM3NTA2OjM0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpzVzFLRzQrQWt3K0dzQUxXclg4VzdWZTd2bTVVUkJnRy9oSERTSDFDSmoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQxNTE5NzUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSjM5In0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "EMMYBOTZ-MD",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2349127237506", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'EMMYBOTZ-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'unavailable',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
