import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useContextValue } from '../../state/state'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'

interface IData {
  firstName: string
  lastName: string
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required('This is a required field'),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required(),
})

export const Step1: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IData>({
    resolver: yupResolver(schema),
  })
  const { state, setState } = useContextValue()
  const history = useHistory()

  const submitHandler = handleSubmit(({ firstName, lastName }) => {
    setState(prev => ({
      ...prev,
      firstName,
      lastName,
    }))

    history.push('/step2')
  })

  return (
    <div className="step1">
      <div className="step1__body">
        <form
          className="step1__form form"
          action="#"
          noValidate
          onSubmit={submitHandler}>
          <TextField
            type="text"
            name="firstName"
            autoComplete="off"
            color="primary"
            variant="outlined"
            label="First name"
            inputRef={register({ required: true })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            defaultValue={state.firstName}
          />
          <TextField
            type="text"
            name="lastName"
            autoComplete="off"
            color="primary"
            variant="outlined"
            label="Last name"
            inputRef={register({ required: true })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            defaultValue={state.lastName}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className="button">
            Next
          </Button>
        </form>
      </div>
    </div>
  )
}
