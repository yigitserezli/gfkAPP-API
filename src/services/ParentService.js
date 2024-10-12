import Parent from "../models/Parents.js";

export const getAllParents = async () => {
    try {
        const parents = await Parent.find().populate("studentId");
        return parents;
    } catch (error) {
        throw new Error(`Error fetching parents: ${error.message}`);
    }
};

export const getParentById = async (id) => {
    try {
        const parent = await Parent.findById(id).populate("studentId");
        return parent;
    } catch (error) {
        throw new Error(`Error fetching parent by id: ${error.message}`);
    }
};

export const updateParent = async (id, data) => {
    try {
        const updatedParent = await Parent.findByIdAndUpdate(id, data, { new: true });
        return updatedParent;
    } catch (error) {
        throw new Error(`Error updating parent: ${error.message}`);
    }
};

export const deleteStudent = async (id) => {
    try {
        const deletedParent = await Parent.findByIdAndDelete(id);
        return deletedParent;
    } catch (error) {
        throw new Error(`Error deleting parent: ${error.message}`);
    }
};
