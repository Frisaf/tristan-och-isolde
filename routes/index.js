import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Tristan & Isolde: Remixed",
        message: "A remixed version of Wagner's Tristan & Isolde."
    });
});

router.get("/prologue", (req, res) => {
    res.render("prologue.njk", {
        title: "Prologue",
        message: "You are Isolde, an intern at Merkeware Inc.; a company that controls the world. You study at Big Land University, but this internship is part of your studies and is required for you to graduate.\nYour mentor during your internship is Tristan, who is very bitter about the fact that he has to take responsibility for you on top of his already stressy work. You think Tristan is a douchebag because of the way he treats you. The help you get is often very vague and you two have barely spoken since you started this internship two weeks ago.\n\nOn top of that, you are rather sad because your dog died the other day. It died because of poisonous water. You don't know how that happened though."
    });
});

router.post("/restart", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Couldn't destroy session:", err)
            return res.status(500).json({error: "Couldn't restart :("})
        }

        res.json({ok: true})
    })
})

export default router;