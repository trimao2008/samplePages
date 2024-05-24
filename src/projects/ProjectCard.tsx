import { Link, Navigate, useNavigate } from "react-router-dom";
import { Project } from "./Project";

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void
}

function ProjectCard(props: ProjectCardProps) {
    const { project, onEdit } = props;

    function formatDescription(description: string): string {
        return description.substring(0, 60) + '...';
    }

    function handleEditClicked(projectBeingEdited: Project) {
        onEdit(projectBeingEdited);
    }
    const navigate = useNavigate();
   
    function handleClickDetails(project: Project): void {
        console.log(navigate);
        navigate(`/projects/${project.id}`);
    }

    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark" onClick={() => handleClickDetails(project)}>
                <h5 className="strong">
                    <strong>{project.name}</strong>
                </h5>
                <p>{formatDescription(project.description)}</p>
                <p>Budget : {project.budget.toLocaleString()}</p>
                <button className="bordered" onClick={() => { handleEditClicked(project) }}>
                    <span className="icon-edit "></span>
                    Edit
                </button>
            </section>
        </div>
    );
}

export default ProjectCard;