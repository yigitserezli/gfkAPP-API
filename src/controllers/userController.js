import { createUser, getAllUsers, getUserById, getUserByFirebaseUid } from "../services/UserService.js";

export const createUserController = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        console.error("Kullanıcı olusturulurken hata olustu: ", error.message);
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            status: "success",
            data: {
                users,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

//GET USER BY ID
export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found by backend controller" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//GET USER BY FIREBASE UID
export const getUserByFirebaseUidController = async (req, res) => {
    try {
        const user = await getUserByFirebaseUid(req.params.firebaseUid);
        if (!user) return res.status(404).json({ message: "User not found by backend controller" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
