import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        if (!filteredUsers) {
            return res.status(200).json([]);
        }
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error occurred in getUsersForSidebar controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}