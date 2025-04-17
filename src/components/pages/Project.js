import React, { useEffect, useState } from 'react'
import styles from './Project.module.css'

import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'


const Project = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((data) => setProject(data))
            .catch((err) => console.log(err))
        }, 1000)
    }, [id])

    function editPost(project) {
        if(project.budget < project.coast) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => {
            setProject(data)
            const state = {message: 'Projeto editado com sucesso!'}
            navigate('/projects', {state})
        })
        .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

  return (
    <>{project.name ? 
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message msg={message} type={type} />}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento:</span> R${project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado:</span> R${project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={project}/>
                        </div>
                    )}
                </div>
            </Container>
        </div>
        : <Loading />
    }
    
    </>
  )
}

export default Project