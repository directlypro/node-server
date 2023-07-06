const express = require('express');
const serverless = require('serverless-http')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
    target: 'https://staging-cmp.iwyze.co.za/v2/lead',
    changeOrigin: true,
    headers: {
        'x-api-key': 'KhTiPHznBz2F1Knava2zt60qDg29wZzdaLW4S8Dd'
    },
    onProxyRes: function (proxyRes, req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}));

app.options('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});

app.use('/functions/index', router);
module.exports.handler = serverless(app);
