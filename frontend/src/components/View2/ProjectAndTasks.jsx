import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/ProjectAndTasks.css";
import { useState, useEffect } from "react";
import TaskAddForm from "./TaskAddForm.jsx";
import TaskUpdateForm from "./TaskUpdateForm.jsx";
import TaskToDo from "./TaskToDo.jsx";
import ProjectForm from "./ProjectForm.jsx";
import { useParams } from "react-router-dom";
import { fetchAllTasks, createTask, updateTask, deleteTask } from "../../api-client.js";

const ProjectAndTasks = () => {
  const { projectId } = useParams();
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  useEffect(() => {
    fetchAllTasks(projectId)
      .then((tasks) => {
        setToDo(tasks);
      })
      .catch((error) => {
        console.error("Error while fetching tasks:", error);
      });
  }, [projectId]);

  const addTask = async () => {
    if (newTask) {
      let taskData = { task: newTask, isCompleted: false };
      const newTaskData = await createTask(projectId, taskData);
      setToDo([...toDo, newTaskData]);
      setNewTask("");
      fetchAllTasks(projectId)
      .then((tasks) => {
        setToDo(tasks);
      })
      .catch((error) => {
        console.error("Error while fetching tasks:", error);
      });
    }
  };

  const deleteTaskById = async (_id) => {
    await deleteTask(projectId, _id);
    setToDo(toDo.filter((task) => task._id !== _id));
  };

  const markDone = async (_id) => {
    console.log("sdfsd");
    let updatedTask = toDo.find((task) => task._id === _id);
    updatedTask.isCompleted = !updatedTask.isCompleted;
    await updateTask(projectId, _id, updatedTask);
    fetchAllTasks(projectId)
      .then((tasks) => {
        setToDo(tasks);
      })
      .catch((error) => {
        console.error("Error while fetching tasks:", error);
      });
  };

  const cancelUpdate = () => {
    setUpdateData("");
  };

  const changeHolder = (e) => {
    setUpdateData({ ...updateData, task: e.target.value });
  };

  const updateTaskById = async () => {
    await updateTask(projectId, updateData._id, updateData);
    let removeOldRecord = [...toDo].filter((task) => task._id !== updateData._id);
    setToDo([...removeOldRecord, updateData]);
    setUpdateData("");
  };

  return (
    <>
      <ProjectForm  projectId={projectId} />
      {projectId !== "0" && (
        <div className="container App">
          <h4>TASK</h4>

          {updateData && updateData ? (
            <TaskUpdateForm
              updateData={updateData}
              changeHolder={changeHolder}
              updateTask={updateTaskById}
              cancelUpdate={cancelUpdate}
            />
          ) : (
            <TaskAddForm
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
            />
          )}

          {toDo && toDo.length ? "" : "No Tasks..."}

          <TaskToDo
            toDo={toDo}
            markDone={markDone}
            setUpdateData={setUpdateData}
            deleteTask={deleteTaskById}
          />
        </div>
      )}    
      </>
  );
};

export default ProjectAndTasks;
