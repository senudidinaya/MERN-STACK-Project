import { addNewProject, getProjects, getProjectWithID, updateProject, deleteProject, addNewTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/projectController';

const routes = (app) =>{
    app.route('/Project')  //initial project list page
        .get(getProjects)
        .post(addNewProject)

    app.route('/Project/:ProjectId')  //update of project
        .get(getProjectWithID)
        .put(updateProject)
        .delete(deleteProject)

    app.route('/Project/:ProjectId/Tasks')   //creating of tasks
        .get(getTasks)
        .post(addNewTask);

    app.route('/Project/:ProjectId/Tasks/:TaskId')  // task updating
        .get(getTask)
        .put(updateTask)
        .delete(deleteTask);
}

export default routes;