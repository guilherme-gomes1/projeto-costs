import React, { useState } from 'react'
import styles from '../project/ProjectForm.module.css'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'


const ServiceForm = ({ handleSubmit, btnText, projectData }) => {
    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }
  return (
    <form onSubmit={submit}>
        <Input
            type='text'
            text='Nome do serviço'
            name='name'
            placeholder='Insira um serviço'
            handleOnChange={handleChange}
        />
        
        <Input
            type='number'
            text='Custo do serviço'
            name='cost'
            placeholder='Insira o valor total'
            handleOnChange={handleChange}
        />
        <Input
            type='text'
            text='Descrição do serviço'
            name='description'
            placeholder='Insira a descrição do serviço'
            handleOnChange={handleChange}
        />

        <SubmitButton text={btnText} />

    </form>
  )
}

export default ServiceForm