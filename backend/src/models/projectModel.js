import mongoose from 'mongoose';

const { Schema } = mongoose;

export const TaskSchema = new Schema({
    task: {
        type: String,
        required: 'Enter task details'
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const ProjectSchema = new Schema({
    projectName:{
        type: String,
        required: true,
        unique: true
    },
    projectArchitect:{
        type: String,
        required: true
    },
    projectClient:{
        type: String,
        required: true
    },
    projectDueDate:{
        type: Date,
        required: true
    },
    projectDescription:{
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    Tasks: {
        type: [TaskSchema],
        default: []
    }
});

