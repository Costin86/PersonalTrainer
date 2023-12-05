import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditTraining({ trainingdata, fetchTrainings }) {
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
    });
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setTraining({
            date: trainingdata.date,
            duration: trainingdata.duration,
            activity: trainingdata.activity,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        fetch(trainingdata.links[0].href, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training),
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Error in edit: " + response.statusText);
                fetchTrainings();
            })
            .catch((err) => console.error(err));

        handleClose();
    };

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Date"
                        value={training.date}
                        onChange={(e) => setTraining({ ...training, date: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
