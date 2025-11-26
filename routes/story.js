import express from "express";
import fs from "fs";

const router = express.Router();
const story_file = JSON.parse((fs.readFileSync("./story.json")))

router.use((req, res, next) => {
    if (!req.session.choices) {
        req.session.choices = []
    }
    next()
})

router.get("/:id", (req, res) => {
    const page = story_file.find(m => m.id === +req.params.id)

    if (page) {
        res.render("story.njk", {
            title: page.title,
            message: page.text,
            choices: page.choices
        })

        req.session.choices.push(page.title)

    }

    else {
        res.status(404).json({error: "Page not found"})
    }
})

router.get("/", (req, res) => {
    res.render("choices.njk", {
        title: "Your choices",
        choices: req.session.choices
    })
})

export default router;