import express from "express"

const router = express.Router()

router.use((req, res, next) => {
    if (!req.session.choices) {
        req.session.choices = []
    }
    next()
})

router.get("/", (req, res) => {
    res.render("choices.njk", {
        title: "Your choices",
        choices: req.session.choices
    })
})

export default router