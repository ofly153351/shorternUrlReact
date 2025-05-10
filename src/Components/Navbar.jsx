import React, { useState, useEffect } from 'react'
import BasicButton from './Material/BasicButton'
import { colors } from '../Util/color'
import NewDialog from './Material/NewDialog'
import { useStore } from '../useStore/useStore'
import AccountMenu from './Material/Acountmenu'


function Navbar() {
    const [openDialog, setOpenDialog] = useState(false)
    const [titles, setTitle] = useState('')
    const [forms, setForm] = useState('')
    const { user } = useStore()
    const handleOpenDiaglog = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const title = {
        website: 'ShortenUrl',
        register: 'Register',
        Login: 'Login'
    }


    const handleOpen = (titles, form) => {
        setOpenDialog(true)
        if (titles === 'Login') {
            setTitle('Login')
            setForm('Login')
        } else {
            setTitle('Register')
            setForm('Register')
        }

    }


    return (
        <div className="fixed w-full h-16 bg-white/70 backdrop-blur-md border-[#D8AE7E] border-b-2 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                <div className='font-bold text-[#A86523]' >
                    <span className='text-lg' >{title.website}</span>
                </div>
                <div className='flex gap-2' >
                    {!user ? (
                        <div className='flex gap-2' >  <BasicButton
                            color={colors.primary}
                            hover={colors.secondary}
                            label={title.register}
                            onClick={() => handleOpen('Register', 'Register')}
                        />
                            <BasicButton
                                color={colors.primary}
                                hover={colors.secondary}
                                label={title.Login}
                                onClick={() => handleOpen('Login', 'Login')}
                            /></div>
                    ) :
                        <div className='flex ' >
                            <div className='flex justify-center items-center text-[#A86523] ' >
                                <span className='hover:underline' >
                                    {user.userName}
                                </span>
                            </div>
                            <AccountMenu />
                        </div>
                    }
                </div>
            </div>
            {openDialog &&
                <NewDialog
                    isClose={handleClose}
                    isOpen={handleOpenDiaglog}
                    label={titles}
                    openform={forms}
                />
            }
        </div>
    )
}

export default Navbar