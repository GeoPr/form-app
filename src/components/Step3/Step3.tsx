import { Button } from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useContextValue } from '../../state/state'
import { FileInput } from '../FileInput/FileInput'

interface IData {
  files: FileList | null
}

export const Step3: React.FC = () => {
  const { state, setState } = useContextValue()
  const history = useHistory()
  const { handleSubmit, control } = useForm<IData>({
    defaultValues: {
      files: state.files
    }
  })

  const submitHandler = handleSubmit(({ files }) => {
    setState(prev => ({
      ...prev,
      files,
    }))

    history.push('/result')
  })

  return (
    <div className="step3">
      <div className="step3__body">
        <form
          action="#"
          className="step3__form form"
          noValidate
          onSubmit={submitHandler}>
          <FileInput name="files" control={control} />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className="button">
            Results
          </Button>
        </form>
      </div>
    </div>
  )
}
