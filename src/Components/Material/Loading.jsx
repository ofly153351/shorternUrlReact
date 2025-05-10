import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';



function Loading() {
    return (
        <Stack spacing={2} direction="row" alignItems="center">
            <CircularProgress size="30px" sx={{ color: '#A86523' }} />
        </Stack>
    )
}

export default Loading