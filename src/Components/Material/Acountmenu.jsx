
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useStore } from '../../useStore/useStore';
import HistoryDialog from './HistoryDialog';
import React, { useState, useEffect } from 'react';
import { getHistoty } from '../../Util/api';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { clearUser } = useStore();
    const [openHistory, setOpenHistory] = React.useState(false); // state to control the history dialog
    const { user } = useStore()
    const [myHistory, setMyHistory] = useState([])

    useEffect(() => {

    }, [])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlelogOut = () => {
        clearUser(null);
        setAnchorEl(null);
    };

    const handleOpenHistory = () => {
        const fetchData = async () => {
            try {
                const res = await getHistoty(user.userId)
                setMyHistory(res || [])
            } catch (error) {
                console.log(error);

            }
        }
        fetchData()
        setOpenHistory(true); // Open the History Dialog
        handleClose(); // Close the menu
    };

    const handleCloseHistory = () => {
        setOpenHistory(false); // Close the History Dialog
    };




    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleOpenHistory}>
                    <Avatar /> My History
                </MenuItem>

                <MenuItem onClick={handlelogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            <HistoryDialog
                data={myHistory}
                label="My History"
                isOpen={openHistory}
                isClose={handleCloseHistory}
            />
        </React.Fragment>
    );
}