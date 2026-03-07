import UserModel from "../models/User.model.js";
import Router from "express"

let router = Router();

router.get("/previousChats/:userId", async (req, res) => {
    try {
        let userId = req.user._id;
        // Populate the chats array by reversing it to show latest first
        let user = await UserModel.findOne({ _id: userId }).populate("chats");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Reverse array to maintain latest at top
        res.json(user.chats.reverse());
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ error: "Failed to fetch previous guides" });
    }
})

router.put("/update", (req, res) => {

    let { email, fullName, avatar } = req.body;

    UserModel.findOneAndUpdate({ email }, { fullName, avatar }).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    });
})

router.delete("/delete", (req, res) => {

    let { email } = req.body;

    UserModel.findOneAndDelete({ email }).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    });
})



export default router;