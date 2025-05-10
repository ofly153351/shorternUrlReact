import React from 'react'
import Button from '@mui/material/Button';

function BasicButton({ label, width, color, hover, onClick }) {

    return (
        <Button
            onClick={onClick}
            sx={{
                width: width,
                backgroundColor: color,
                '&:hover': {
                    backgroundColor: hover,
                },

            }}
            variant="contained">{label}</Button>
    )
}

export default BasicButton