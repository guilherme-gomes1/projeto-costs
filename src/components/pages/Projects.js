import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'


import styles from './Projects.module.css'
import ProjectCard from '../project/ProjectCard'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessade] = useState('');

  const location = useLocation()
  let message = ''
  if(location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    }, 1000) 
  }, [])

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      setProjectMessade('Projeto excluído com sucesso!')
    })
    .catch((err) => console.log(err))
      // .then((res) => res.json())
      // .then((data) => {
        // setProjects(projects.filter((project) => project.id !== id))
        //message
      // }
      // .catch((err) => console.log(err))
      setProjects(projects.filter((project) => project.id !== id))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.tittle_container}>
        <h1>Projetos</h1>
        <LinkButton to='/newproject' text='Criar Projeto'/>
      </div>
      {message && <Message msg={message} type="sucess"/>}
      {projectMessage && <Message msg={projectMessage} type="error"/>}

      <Container customClass='start'>
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard 
            id={project.id}
            key={project.id}
            name={project.name} 
            budget={project.budget}
            category={project.category?.name}
            handleRemove={removeProject}
            />
          ))}
          {!removeLoading && <Loading />}
          {removeLoading && projects.length === 0 && (
            <p>Não há projetos cadastrados!</p>
          )}
      </Container>
    </div>
  )
}

export default Projects