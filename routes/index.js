import express from "express"
import fs from "fs"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Tristan & Isolde: Remixed",
        message: "A remixed version of Wagner's Tristan & Isolde."
    })
});

export default router