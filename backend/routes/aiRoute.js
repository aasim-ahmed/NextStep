import { Router } from "express";
import askAi from "../Utils/AskAi.js";
import GuideModel from "../models/Guide.model.js";
import UserModel from "../models/User.model.js";

let router = Router();


router.post("/askQuery/:id", async (req, res) => {
    // We ignore the :id from the URL params and use the securely authenticated user ID
    let userId = req.user._id;

    let { name, topic, previousExperience } = req.body;

    let aiRes = await askAi(topic, previousExperience, name);

    if (!aiRes) {
        return res.status(500).json({ status: "error", message: "Failed to generate AI response." });
    }

    let aiResJSON;
    try {
        aiResJSON = JSON.parse(aiRes);
    } catch (e) {
        return res.status(500).json({ status: "error", message: "Invalid JSON response from AI." });
    }


    let guideModel = new GuideModel(aiResJSON);
    await guideModel.save();

    let userModel = await UserModel.findOne({ _id: userId });
    userModel.chats.push(guideModel._id);
    await userModel.save();


    res.json(aiResJSON);



});


export default router;