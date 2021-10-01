import { useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/Grid";


const EditTodoForm = (props) => {

    const { open, setEditDialogOpen } = props

    const handleClose = () => {
        setEditDialogOpen(false)
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.text}</DialogTitle>
                <DialogContent>
                <Grid
                    container
                    spacing={2}
                    marginTop="30px"
                    paddingBottom="50px"
                    marginLeft="20px"
                    direction="column"
                >
                    <Grid item>
                    <TextField
                        id="filled-basic"
                        label="Text:"
                        name="text"
                        variant="filled"
                    />
                    </Grid>

                    <Grid item>
                    <Button variant="contained" color="success" >
                        Add TODO
                    </Button>
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditTodoForm
