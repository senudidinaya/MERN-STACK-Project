import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../../styles/ProjectForm.css";
import { createProject, updateProject, fetchProjectById } from "../../api-client";

const ProjectForm = ({ projectId }) => {
  let navigate = useNavigate();

  const [project, setProject] = useState({
      projectName: '',
      projectArchitect: '',
      projectClient: '',
      projectDueDate: '',
      projectDescription: ''
    });

  useEffect(() => {
    if (projectId !== '0') {
      fetchProjectById(projectId).then(data => {
        // Convert the date to YYYY-MM-DD format
        const date = new Date(data.projectDueDate);
        const formattedDate = date.toISOString().split('T')[0];       
        setProject({ ...data, projectDueDate: formattedDate });
      });
    }
  }, [projectId]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectId === '0') {
      await createProject(project);
    } else {
      await updateProject(projectId, project);
    }
    navigate(`/`);
  };

  const handleGoBack = () => {
    navigate(`/`);
  };

  return (
    <div className='topform'>
      <form onSubmit={handleSubmit}>
        <h2>Project Details!</h2>
        <label>
          Project Name:
          <input type="text" name="projectName" value={project.projectName} onChange={handleChange} required />
        </label>
        <label>
          Project Architect:
          <input type="text" name="projectArchitect" value={project.projectArchitect} onChange={handleChange} required />
        </label>
        <label>
          Project Client:
          <input type="text" name="projectClient" value={project.projectClient} onChange={handleChange} required />
        </label>
        <label>
          Project Due Date:
          <input type="date" name="projectDueDate" value={project.projectDueDate} onChange={handleChange} required />
        </label>
        <label>
          Project Description:
          <textarea name="projectDescription" value={project.projectDescription} onChange={handleChange} required />
        </label>
        <input type="submit" value={projectId === '0' ? "Create Project" : "Save Changes"} />
        <button type="button" onClick={handleGoBack}>Go Back</button>
      </form>
    </div>
  )
}

export default ProjectForm
