"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const database_js_1 = require("./config/database.js");
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
async function start() {
    try {
        await (0, database_js_1.connectToDatabase)();
        console.log('Connected to MongoDB');
        app_js_1.default.listen(port, () => {
            console.log(`Server listening on port ${port}`);
            console.log(`API base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
start();
