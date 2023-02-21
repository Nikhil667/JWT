const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const crypto = require('crypto');

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }))
app.use(cookieParser())

const USERS = new Map()
USERS.set("WDS", {id: 1, username: "WDS", role: "Admin"})
USERS.set("Nik", {id: 2, username: "Nik", role: "User"})

const SESSIONS = new Map()

app.post("/login", (req, res) => {
    const user = USERS.get(req.body.username)
    if(user == null){
        res.sendStatus(401)
        return
    }

    const sessionId = crypto.randomUUID()
    SESSIONS.set(sessionId, user)
    res
        .cookie("sessionId", sessionId, {
            secure: true,
            httpOnly: true,
            sameSite: "none"
        })
        .send(`Authed as ${req.body.username}`)
})

app.get("/adminData", (req, res) => {
    console.log(req.cookies)
    const user = SESSIONS.get(req.cookies.sessionId)
    if(user == null){
        res.sendStatus(401)
        return
    }
    if(user.role !== "Admin"){
        res.sendStatus(403)
        return
    }
    res.send("This is Admin Stuff")
})

app.listen(8000, ()=>{
    console.log("running at 8000")
});