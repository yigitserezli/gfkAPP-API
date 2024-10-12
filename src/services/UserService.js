import User from "../models/Users.js";
import Parent from "../models/Parents.js";

export const createUser = async (userData) => {
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("Bu e-posta adresine sahip bir kullanıcı zaten var.");
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        if (userData.parentId) {
            const parent = await Parent.findById(userData.parentId);
            if (!parent) {
                throw new Error("Parent kaydı bulunamadı.");
            }
            console.log("Bulunan Parent:", parent);

            const updatedParent = await Parent.findByIdAndUpdate(
                userData.parentId,
                { userId: savedUser._id }, // Parent kaydındaki userId'yi güncelle
                { new: true }
            );

            if (!updatedParent) {
                throw new Error("Parent kaydı güncellenemedi.");
            }

            console.log("Parent güncellendi:", updatedParent);
        }

        return savedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserById = async (userId) => {
    return await User.findById(userId);
};

export const getUserByFirebaseUid = async (firebaseUid) => {
    try {
        return await User.findOne({ firebaseUID: firebaseUid });
    } catch (error) {
        throw new Error(error.message);
    }
};
