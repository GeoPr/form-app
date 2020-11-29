import React from 'react'
import { Control, Controller } from 'react-hook-form'
import DropZone from 'react-dropzone'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core'
import { InsertDriveFile, CloudUpload } from '@material-ui/icons'
import { useContextValue } from '../../state/state'

interface IProps {
  control: Control
  name: string
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    placeContent: 'center',
    placeItems: 'center',
    rowGap: '15px',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: 10,
    padding: 10,
    color: '#333',
    height: 200,
  },
  icon: {
    fontSize: '45px',
  },
}))

export const FileInput: React.FC<IProps> = ({ control, name }) => {
  const styles = useStyles()
  const { state } = useContextValue()
  console.log(state.files)

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ onBlur, onChange, value }) => (
        <>
          <DropZone onDrop={onChange}>
            {({ getInputProps, getRootProps }) => (
              <Paper
                variant="outlined"
                {...getRootProps()}
                className={styles.root}>
                <CloudUpload className={styles.icon} />
                <input name={name} onBlur={onBlur} {...getInputProps()} />
                <p>Dran 'n' drop files here, or click to select files</p>
              </Paper>
            )}
          </DropZone>
          <List>
            {value.map((file: File, idx: number) => {
              return (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <InsertDriveFile className={styles.icon} />
                  </ListItemIcon>
                  <ListItemText primary={file.name} secondary={file.size} />
                </ListItem>
              )
            })}
          </List>
        </>
      )}
    />
  )
}
