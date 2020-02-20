"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res, next) => {
    res.send('Server is up and running!');
});
app.get('/transactions', (req, res, next) => {
    fs_1.default.readFile('./public/transactions.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            const transactions = JSON.parse(jsonString);
            res.json(transactions);
        }
        catch (err) {
            console.log('Error parsing JSON string:', err);
        }
    });
});
app.post('/transactions', (req, res) => {
    const amount = req.body.amount;
    const provider = req.body.provider;
    const state = req.body.state;
    const currency = req.body.currency;
    if (!currency) {
        res.send('<h1>Currency value is missing!</h1>');
    }
    else {
        res.send(`Your payload is Amount : ${amount}, Provider : ${provider}, State: ${state}, Currency : ${currency}`);
    }
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map