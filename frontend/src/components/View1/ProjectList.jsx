import React, { useState, useEffect } from "react";
import { fetchAllProjects, deleteProject } from "../../api-client";
import ProjectsCard from "./ProjectsCard";
import Button from "react-bootstrap/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    fetchAllProjects()
      .then((data) => {
        setProjects(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error while getting data");
      });
  }, []);

  const onAdd = (project) => {
    const projectId = project?.id ?? 0;
    console.log(`Adding project: ${projectId}`);
    navigate(`/task/${projectId}`);
  };

  const onEdit = (project) => {
    const projectId = project?._id ?? 0;
    console.log(`Editing project: ${project}`);
    navigate(`/task/${projectId}`);
  };

  const onDelete = (project) => {
    deleteProject(project._id)
      .then(() => {
        setProjects(projects.filter((p) => p._id !== project._id));
      })
      .catch((error) => {
        console.log("Error while deleting project");
      });
  };

  const onNext = (project) => {
    console.log(`Moving to next project: ${project.id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.projectArchitect.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const projectsList =
  filteredProjects.map((project, index) => ( 
    <ProjectsCard
      key={index}
      project={project}
      onEdit={onEdit}
      onDelete={onDelete}
      onNext={onNext}
    />
  ));

  return (
    <>
    <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="primary" style={{ margin: "1rem" }} onClick={onAdd} >
          <FontAwesomeIcon icon={faPlus} /> Add New Project
        </Button>
        <form
          className="form-inline my-2 my-lg-0"
          style={{ display: "flex", alignItems: "center", margin: "1rem" }}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by Architect Name"
            aria-label="Search"
            onChange={handleSearch}
            style={{ width: "225px", marginRight: "1rem" }} 
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    <div className="container">
      <div className="list">
        {projectsList}  
      </div>
    </div>
    </>

  );
};

export default ProjectList;
