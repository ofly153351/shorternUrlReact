import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Basictextfield({ label, type, onChange, name }) {
    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id={`input-${name}`}
                name={name}
                onChange={onChange}
                label={label}
                variant="standard"
                type={type}
            />
        </Box>
    );
}

export default Basictextfield;