import express from "express"
import fetch from "node-fetch";
import { getUserById, getAllUsers } from "../models/user.js";
import { getHabitsByUserId } from "../models/habits.js"

let router = express.Router();

let url = "https://hooks.slack.com/services/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"

alertRouter.get("/", async function(req,res,next) {

    let userListRaw = await getAllUsers()
    for (let u=0;u<users.length;u++) {
        let habitsOfCurrentlySelectedUser = await getHabitsByUserId(users[u])
            for (let h=0;h<habitsOfCurrentlySelectedUser.length;h++) {
                
            }
    }


    
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
    res.json({
        Greeting: "Hello world",
        Date: "The date and time today is: " + new Date().toISOString(),
        slackResponse: response
    });
});
export default router