import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {
  faEdit,
  faTrash,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectsCard = ({ project, onEdit, onDelete, onNext }) => {
  return (
    <Card style={{ width: "100%", margin: "1rem 0" }}>
      <Card.Body>
        <Card.Title>
          Project Name : {project.projectName}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Architect: {project.projectArchitect}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Client: {project.projectClient}
        </Card.Subtitle>
        <Card.Text>
          Project Description : {project.projectDescription}
        </Card.Text>
        <Form.Group className="d-flex align-items-center">
          <Form.Label className="mb-0 mr-3">Project Due Date</Form.Label>
          <Form.Control
            style={{ width: "10rem", marginLeft: "1rem" }}
            type="date"
            defaultValue={project.projectDueDate.split("T")[0]}
            disabled
          />
          
        </Form.Group>
        <Button
            icon={faEdit}
            onClick={() => onEdit(project)}
            style={{ marginLeft: "20rem" }}
          />
          <Button
            icon={faTrash}
            onClick={() => onDelete(project)}
            style={{ marginLeft: "3rem" }}
          />
          <Button
            icon={faArrowRight}
            onClick={() => onNext(project)}
            style={{ marginLeft: "3rem" }}
          />
      </Card.Body>
    </Card>
  );
};
export default ProjectsCard;
