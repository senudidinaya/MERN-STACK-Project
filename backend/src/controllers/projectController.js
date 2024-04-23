import mongoose from 'mongoose';
import { ProjectSchema, TaskSchema } from '../models/projectModel';

const Project = mongoose.model('Project', ProjectSchema);
const Task = mongoose.model('Task', TaskSchema);

// Project Routes

export const addNewProject = (req, res) => { //creating project
    let newProject = new Project(req.body);

    newProject.save()
        .then(Project => {
            res.json(Project);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};


export const getProjects = (req, res) => { //getting all projects
    Project.find({})
        .then(Project => {
            res.json(Project);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

export const getProjectWithID = (req, res) => {  //getting created project using the project ID
    Project.findById(req.params.ProjectId)
        .then(Project => {
            res.json(Project);
        })
        .catch (error => {
            res.status(500).json({ message: error.message });
        });
}

export const updateProject = (req, res) => { //updating project using the project ID and ...
    Project.findOneAndUpdate({ _id: req.params.ProjectId }, req.body, {new : true})
        .then(Project => {
            res.json(Project);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

export const deleteProject = (req, res) => { //deleting project       , "i have to implement a confirmation project"
    Project.deleteOne({ _id: req.params.ProjectId })
        .then(Project => {
            res.json({ message: 'Project deleted' });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

//Task routes

export const addNewTask = (req, res) => {
    Project.findById(req.params.ProjectId)
        .then(Project => {
            if (!Project) {
                res.status(404).send({ message: 'No project found with the provided ID.' });
                return;
            }
            const newTask = new Task(req.body);
            Project.Tasks.push(newTask);
            return Project.save();
        })
        .then(Project => {
            res.json(Project);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

export const getTasks = (req, res) => {
    const { ProjectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(ProjectId)) {
        return res.status(400).send({ message: 'Invalid ProjectId.' });
    }

    Project.findById(ProjectId)
        .then(Project => {
            if (!Project) {
                res.status(404).send({ message: 'No project found with the provided ID.' });
                return;
            }
            res.json(Project.Tasks);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: error.message });
        });
};

export const getTask = (req, res) => {
    Project.findById(req.params.ProjectId)
        .then(Project => {
            if (!Project) {
                res.status(404).send({ message: 'No project found with the provided ID.' });
                return;
            }
            res.json(Project.Tasks.id(req.params.TaskId));
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

export const updateTask = (req, res) => {
    Project.findById(req.params.ProjectId)
        .then(Project => {
            if (!Project) {
                res.status(404).send({ message: 'No project found with the provided ID.' });
                return;
            }
            let Task = Project.Tasks.id(req.params.TaskId);
            Task.set(req.body);
            return Project.save();
        })
        .then(Project => {
            res.json(Project);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

export const deleteTask = (req, res) => {
    Project.findById(req.params.ProjectId)
        .then(Project => {
            if (!Project) {
                res.status(404).send({ message: 'No project found with the provided ID.' });
                return;
            }
            const task = Project.Tasks.id(req.params.TaskId);
            if (!task) {
                res.status(404).send({ message: 'No task found with the provided ID.' });
                return;
            }
            Project.Tasks.pull(task);
            return Project.save();
        })
        .then(Project => {
            res.json({ message: 'Task deleted' });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
