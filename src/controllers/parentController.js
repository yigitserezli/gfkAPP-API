import { getAllParents, getParentById, updateParent, deleteStudent } from "../services/ParentService.js";

export const getAllParentsController = async (req, res) => {
    try {
        const parents = await getAllParents();
        res.status(200).json(parents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getParentByIdController = async (req, res) => {
    try {
        const parent = await getParentById(req.params.id);
        if (!parent) return res.status(404).json({ message: "Parent not found" });
        res.status(200).json(parent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateParentController = async (req, res) => {
    try {
        const updatedParent = await updateParent(req.params.id, req.body);
        if (!updatedParent) return res.status(404).json({ message: "Parent not found" });
        res.status(200).json(updatedParent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteParentController = async (req, res) => {
    try {
        const deletedParent = await deleteStudent(req.params.id);
        if (!deletedParent) return res.status(404).json({ message: "Parent not found" });
        res.status(200).json({ message: "Parent deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
