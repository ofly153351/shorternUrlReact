import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Basictextfield from './Basictextfield';
import { login, register } from '../../Util/api';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function NewDialog({ label, openform, isOpen, isClose }) {
    const [open, setOpen] = useState(true);
    const [formData, setFormData] = useState({});

    const handleClose = () => {
        setOpen(false);
    };

    // console.log(openform);




    const labelform =
        openform === 'Register'
            ? ['Username', 'Password', 'ConfirmPassword']
            : ['Username', 'Password'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = () => {
        if (!formData) return;

        if (openform === 'Register') {
            if (formData.Password === formData.ConfirmPassword) {

                let payload = {
                    userName: formData.Username,
                    password: formData.Password
                }
                const Fetchdata = async () => {
                    try {
                        const res = await register(payload)
                        if (res.status === 200) {
                            alert('Register Succesfully')
                        }
                    } catch (error) {
                        console.log(error);
                        alert('Register fail')

                    }

                }
                Fetchdata();
            }
        } else if (openform === 'Login') {
            if (!formData) return;

            let payload = {
                userName: formData.Username,
                password: formData.Password
            }

            // console.log(payload);

            const Fetchdata = async () => {
                try {
                    const res = await login(payload)

                    if (res.status === 200) {
                        alert('Login Succesfully')
                    }
                } catch (error) {
                    console.log(error);
                    alert('Login fail ')
                }
            }
            Fetchdata();
        }

        isClose();
    };

    // console.log(formData);


    return (
        <React.Fragment>

            <Dialog
                open={isOpen}
                slots={{ transition: Transition }}
                keepMounted
                onClose={isClose}
            >
                <DialogTitle>{label}</DialogTitle>
                <DialogContent>
                    {labelform.map((item, index) => (
                        <Basictextfield
                            key={index}
                            label={item}
                            name={item}
                            type={
                                item.toLowerCase().includes('password')
                                    ? 'password'
                                    : 'text'
                            }
                            onChange={handleChange}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default NewDialog;