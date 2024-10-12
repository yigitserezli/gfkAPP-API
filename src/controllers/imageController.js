import User from "../models/Users.js";

export const updateUserProfileImage = async (req, res) => {
    try {
        const { userId, imageUrl } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profileImageUrl: imageUrl,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Kullanici bulunamadi haci" });
        }

        res.status(200).json({ message: "Profil resmi guncellendi", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Profil resmi güncellenirken bir hata oluştu", error });
    }
};
