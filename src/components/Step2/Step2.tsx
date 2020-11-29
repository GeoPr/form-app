import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core'
import * as yup from 'yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContextValue } from '../../state/state'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useHistory } from 'react-router'

interface IData {
  email: string
  phoneNumber?: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('There isn`t email like that')
    .required('Email is a required field'),
})

export const Step2: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IData>({
    resolver: yupResolver(schema),
  })
  const { state, setState } = useContextValue()
  const history = useHistory()

  const submitHandler = handleSubmit(({ email, phoneNumber }) => {
    setState(prev => ({
      ...prev,
      email,
      phoneNumber: phoneNumber ? phoneNumber : prev.phoneNumber,
      hasPhone: phoneNumber ? true : false,
    }))

    history.push('/step3')
  })

  const normalizePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value)

    if (!phoneNumber) return value

    return phoneNumber.formatInternational()
  }

  return (
    <div className="step2">
      <div className="step2__body">
        <form
          className="step2__form form"
          action="#"
          noValidate
          onSubmit={submitHandler}>
          <TextField
            type="email"
            name="email"
            autoComplete="off"
            color="primary"
            variant="outlined"
            label="Email"
            inputRef={register({ required: true })}
            error={!!errors.email}
            helperText={errors.email?.message}
            defaultValue={state.email}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={state.hasPhone}
                onChange={() => {
                  setState(prev => ({ ...prev, hasPhone: !state.hasPhone }))
                }}
              />
            }
            label="Do you have phone?"
          />
          {state.hasPhone && (
            <TextField
              type="tel"
              name="phoneNumber"
              autoComplete="off"
              color="primary"
              variant="outlined"
              label="Phone number"
              placeholder="+12341234123"
              inputRef={register({ required: true })}
              defaultValue={state.phoneNumber}
              onChange={e => {
                e.target.value = normalizePhoneNumber(e.target.value)
              }}
            />
          )}
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
