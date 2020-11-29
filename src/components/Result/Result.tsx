import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core'
import { InsertDriveFile } from '@material-ui/icons'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useContextValue } from '../../state/state'
import Swal from 'sweetalert2'
import './Result.scss'

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 500,
  },
  cell: {
    fontSize: '18px',
  },
  icon: {
    fontSize: '45px',
  },
  title: {
    textAlign: 'center',
    margin: '0 0 20px 0',
  },
}))

export const Result: React.FC = () => {
  const { state, setState } = useContextValue()
  const stateAsArray = Object.entries(state)
  const files = stateAsArray.pop()
	const styles = useStyles()
	const history = useHistory()
	
	const clickHandler = () => {
		Swal.fire({
			icon: 'success',
			title: 'Congratulations',
			text: 'U`ve finished this difficult form challenge !',
			confirmButtonText: 'Close'
		})

		setState(prev => ({
			...prev,
			firstName: '',
			lastName: '',
			email: '',
			hasPhone: false,
			phoneNumber: '',
			files: null
		}))

		history.push('/')
	}

  return (
    <div className="result">
      <div className="result__body">
        <div className="result__table">
          <Typography variant="h4" className={styles.title}>
            Info 🧾
          </Typography>
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="a dense table"
              className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Field</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Value</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stateAsArray.map((item, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell className={styles.cell}>
                        {`${item[0]}`}
                      </TableCell>
                      <TableCell className={styles.cell}>
                        {item[1].toString().length ? `${item[1]}` : '—'}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {files![1] && (
          <div className="result__files">
            <Typography variant="h4" className={styles.title}>
              Files 📦
            </Typography>
            <List>
              {files![1].map((file: File, idx: number) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <InsertDriveFile className={styles.icon} />
                  </ListItemIcon>
                  <ListItemText primary={file.name} secondary={file.size} />
                </ListItem>
              ))}
            </List>
          </div>
        )}
        <div className="result__buttons">
          <Button color="primary" variant="contained" onClick={clickHandler}>
            Submit
          </Button>
          <Link to="/">
            <Button color="secondary" variant="contained">
              Start over
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
