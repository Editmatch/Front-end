import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease-in;
  &:hover {
    transform: scale(1.03);
  }
`;

const CardTitle = styled.h3`
  color: #333333;
  font-size: 18px;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  color: #666666;
  font-size: 14px;
  margin-bottom: 10px;
`;

const CardSkills = styled.div`
  color: #999999;
  font-size: 12px;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

interface Project {
  orderId: string;
  title: string;
  description: string;
  skills: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <Col md={3} key={project.orderId}>
    <LinkStyled to={`/meu-pedido/${project.orderId}`}>
      <div>
        <CardContainer>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
          <CardSkills>
            {project.skills.split(",").map((skill, index) => (
              <span key={index}>{skill.trim()}</span>
            ))}
          </CardSkills>
        </CardContainer>
      </div>
    </LinkStyled>
  </Col>
);

export default ProjectCard;
