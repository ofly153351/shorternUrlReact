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
                sx={{
                    '& label.Mui-focused': {
                        color: '#A86523',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#A86523',
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: '#E9A319',
                    }
                }}
            />
        </Box>
    );
}

export default Basictextfield;