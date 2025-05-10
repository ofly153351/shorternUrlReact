import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import HistoryTable from './HistoryTable';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function HistoryDialog({ label, isOpen, isClose, data }) {
    const [open, setOpen] = useState(isOpen);

    console.log("data", data);


    useEffect(() => {
        setOpen(isOpen); // Sync dialog state with prop
    }, [isOpen]);

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={isClose}
            PaperProps={{
                sx: {
                    width: 900,
                    maxWidth: '90%'  // ป้องกันล้นจอ
                },
            }}
        >
            <DialogTitle>{label}</DialogTitle>
            <DialogContent>
                <HistoryTable data={data} />
            </DialogContent>
            <DialogActions>
                <Button onClick={isClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default HistoryDialog;