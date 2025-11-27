import express from "express";
import nunjucks from "nunjucks"
import morgan from "morgan"
import indexRouter from "./routes/index.js"
import session from "express-session"
import storyRouter from "./routes/story.js"

const app = express()

app.use(morgan("dev"))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: "very-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

nunjucks.configure("views", {
    autoescape: true,
    express: app
})

app.use("/", indexRouter)
// app.use("/choices", choicesRouter)
app.use("/story", storyRouter)
app.use(notFound)

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})

function notFound(req, res, next) {
    res.status(404)
    res.send("404 Not Found")
}