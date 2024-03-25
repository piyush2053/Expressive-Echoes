import React, { useState } from "react"
import { loginUser } from "../../../Utils/functions.ts";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import { Helmet } from "react-helmet-async";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    const Navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { email, password } = formData;
            if(email === 'admin@piyush'){
                Navigate('/admin')
            }
            else{
                const response = await loginUser(email, password);
            if (response) {
                Navigate("/home");
                localStorage.setItem("email", formData.email);
            } else {
                alert("Wrong credentials");
            }
            }
        } catch (error) {
            console.error("Error logging in:", error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="mx-auto max-w-sm m-20 bg-[#EEEEEE] shadow-xl p-10 rounded-lg">
              <Helmet>
                <title>Login</title>
            </Helmet>
            <form onSubmit={handleLogin}>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p>Enter your email and password below to login to your account</p>
                </div>
                <div className="space-y-4 mt-10">
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
                    <button
                        className="button w-full p-2 bg-black rounded-lg text-white hover:shadow-xl relative"
                        type="submit"
                    >
                        {loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : (
                            'Login'
                        )}
                    </button>
                </div>
            </form>
            <div className="mt-4 text-center text-sm">
                <p>
                    Don't have an account?{' '}
                    <a className="underline" href="/register">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

