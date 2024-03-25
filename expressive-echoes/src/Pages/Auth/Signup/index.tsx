import React, { useState } from 'react';
import { submitFormData } from '../../../Utils/functions.ts';
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

export default function Signup() {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        netImg: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await submitFormData(formData);
            if (response) {
                Navigate('/')
                localStorage.setItem('name', formData.name)
                localStorage.setItem('email', formData.email)
                localStorage.setItem('img', formData.netImg)
            } else {
                alert('Error Occured! Try Again Later')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-sm m-20 bg-[#EEEEEE] shadow-xl p-10 rounded-lg">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <p>Enter your Details below to Register</p>
                </div>
                <div className="space-y-4 mt-10">
                    <input
                        className="input p-2 rounded-lg w-full"
                        id="name"
                        placeholder="Name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        className="input p-2 rounded-lg w-full"
                        id="email"
                        placeholder="Email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className="input p-2 rounded-lg w-full"
                        id="password"
                        placeholder="Password"
                        required
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        className="input p-2 rounded-lg w-full"
                        id="netImg"
                        placeholder="Image (Network Image)"
                        required
                        type="text"
                        value={formData.netImg}
                        onChange={handleChange}
                    />
                    <button className="button w-full p-2 bg-black rounded-lg text-white hover:shadow-xl" type="submit">
                        {loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : (
                            'Register'
                        )}
                    </button>
                </div>
            </form>
            <div className="mt-4 text-center text-sm">
                <p>
                    Already have an account?{' '}
                    <a className="underline" href="/">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
