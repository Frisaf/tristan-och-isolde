import express from "express";
import fs from "fs";

const router = express.Router();
const story_file = JSON.parse((fs.readFileSync("./story.json")))

router.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Tristan & Isolde: Remixed",
        message: "A remixed version of Wagner's Tristan & Isolde."
    });
});

router.get("/story", (req, res) => {
    res.render("story.njk", {
        title: "Prologue",
        message: "You are Isolde, an intern at Merkeware Inc.; a company that controls the world. You study at Big Land University, but this internship is part of your studies and is required for you to graduate.\nYour mentor during your internship is Tristan, who is very bitter about the fact that he has to take responsibility for you on top of his already stressy work. You think Tristan is a douchebag because of the way he treats you. The help you get is often very vague and you two have barely spoken since you started this internship two weeks ago.\n\nOn top of that, you are rather sad because your dog died the other day. It died because of poisonous water. You don't know how that happened though."
    });
});

router.get("/story_page/:id", (req, res) => {
    const page = story_file.find(m => m.id === +req.params.id)

    if (page) {
        res.render("story_page.njk", {
            title: page.title,
            message: page.text,
            choices: page.choices
        })
    }

    else {
        res.status(404).json({error: "Page not found"})
    }
})

// req.session.history somewhere

export default router;