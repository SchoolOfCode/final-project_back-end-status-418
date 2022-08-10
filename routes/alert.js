import express from "express"
import fetch from "node-fetch";

let router = express.Router();

let url = "https://hooks.slack.com/services/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"

router.get("/", async function(req,res,next) {

    let response = await fetch (url, {
        
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            text:"Guten Morgen!",
        }),
    })
//DO NOT NEED "let data = response.json because below line parses it - don't parse twice"
    res.json({
        Greeting: "Hello world",
        Date: "The date and time today is: " + new Date().toISOString(),
        slackResponse: response
    });
});
export default router