import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import '../../index.css';
import { URL } from '../../Utils/contants.js'
import Header from "../../Components/Header.tsx";
import { Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface FormErrors {
    titleError: string;
    contentError: string;
    thumbnailError: string;
    userImageError: string
    authorError: string;
    emailError: string;
}

export default function PostBlog() {
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        thumbnail: "",
        userImage: "",
        author: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({
        titleError: "",
        contentError: "",
        thumbnailError: "",
        userImageError: "",
        authorError: "",
        emailError: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    const navigate = useNavigate()
    
    const handleDialogClose = () => {
        setOpenDialog(false);
        navigate('/');
    };

    const handleSubmit = () => {
        let errors: FormErrors = {
            titleError: "",
            contentError: "",
            thumbnailError: "",
            userImageError: "",
            authorError: "",
            emailError: "",
        };
        let isValid = true;

        if (formData.title.trim() === "") {
            errors.titleError = "Title is required";
            isValid = false;
        }
        if (formData.content.trim() === "") {
            errors.contentError = "Blog Content is required";
            isValid = false;
        }
        if (formData.thumbnail.trim() === "") {
            errors.thumbnailError = "Thumbnail is required";
            isValid = false;
        }
        if (formData.author.trim() === "") {
            errors.authorError = "Author Name is required";
            isValid = false;
        }
        if (formData.email.trim() === "") {
            errors.emailError = "Author Email is required";
            isValid = false;
        }
        if (formData.userImage.trim() === "") {
            errors.userImageError = "User Image is required";
            isValid = false;
        }

        setFormErrors(errors);
        if (isValid) {
            const publishData = async () => {
                const isLocalhost = window.location.href.includes('localhost');
                const apiURL = isLocalhost ? URL.PUBLISH_LOCAL : URL.PUBLISH_PROD;
                const response = await fetch(apiURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    const responsedata = await response.json()
                    console.log("Form submitted:", responsedata);
                    setOpenDialog(true);
                } else {

                }
            }
            publishData()
            setFormData({
                title: "",
                content: "",
                thumbnail: "",
                userImage: "",
                author: "",
                email: "",
            });
            setFormErrors({
                titleError: "",
                contentError: "",
                thumbnailError: "",
                userImageError: "",
                authorError: "",
                emailError: "",
            });
        } else {
            console.log("Form validation failed");
        }
    };

    return (
        <div>
            <Helmet>
                <title>Publish</title>
            </Helmet>
            <Header />
            <div className="fade-in px-9">
                <div className="grid w-full gap-4">
                    <div className="grid gap-1.5">
                        <h3 className="text-2xl font-semibold">
                            Title
                        </h3>
                        <input id="title" className="rounded-md border border-grey-500 px-3 w-full" type="text" value={formData.title} onChange={handleInputChange} />
                        {formErrors.titleError && <span className="text-[#F4511E]">{formErrors.titleError}</span>}
                    </div>
                    <div className="grid gap-1.5">
                        <h5 className="text-2xl font-semibold">
                            Blog Content
                        </h5>
                        <textarea id="content" className="py-3 rounded-md border border-grey-500 px-3 w-full min-h-[250px]" value={formData.content} onChange={handleInputChange} />
                        {formErrors.contentError && <span className="text-[#F4511E]">{formErrors.contentError}</span>}
                    </div>
                    <div className="grid gap-1.5">
                        <h5 className="text-1xl font-semibold">
                            Thumbnail
                        </h5>
                        <Tooltip title="Please Provide Network image address" arrow>
                            <input id="thumbnail" className="rounded-md border border-grey-500 px-3 w-full" type="text" value={formData.thumbnail} onChange={handleInputChange} />
                        </Tooltip>
                        {formErrors.thumbnailError && <span className="text-[#F4511E]">{formErrors.thumbnailError}</span>}
                    </div>
                    <div className="grid gap-1.5">
                        <h5 className="text-1xl font-semibold">
                            Author Name
                        </h5>
                        <input id="author" className="rounded-md border border-grey-500 px-3 w-full" type="text" value={formData.author} onChange={handleInputChange} />
                        {formErrors.authorError && <span className="text-[#F4511E]">{formErrors.authorError}</span>}
                    </div>
                    <div className="grid gap-1.5">
                        <h5 className="text-1xl font-semibold">
                            Author Email
                        </h5>
                        <input id="email" className="rounded-md border border-grey-500 px-3 w-full" type="email" value={formData.email} onChange={handleInputChange} />
                        {formErrors.emailError && <span className="text-[#F4511E]">{formErrors.emailError}</span>}
                    </div>
                    <div className="grid gap-1.5">
                        <h5 className="text-1xl font-semibold">User Image</h5>
                        <Tooltip title="Please Provide Network image address" arrow>
                            <input id="userImage" className="rounded-md border border-grey-500 px-3 w-full" type="text" value={formData.userImage} onChange={handleInputChange} />
                        </Tooltip>
                        {formErrors.userImageError && <span className="text-[#F4511E]">{formErrors.userImageError}</span>}
                    </div>
                    <Tooltip title="Submitting this Content will Publish your Blog on the Website" arrow>
                        <button className="bg-[#212121] mb-10 py-1 px-3 rounded-lg text-white hover:text-white hover:bg-[#9E9E9E] w-[100px]" onClick={handleSubmit}>Submit</button>
                    </Tooltip>
                    <Dialog open={openDialog} onClose={handleDialogClose}>
                        <DialogTitle>Blog Published</DialogTitle>
                        <DialogContent>
                            <CheckCircleOutlineIcon fontSize="large" style={{ color: '#4CAF50', marginBottom: '10px' }} />
                            <div>Your blog has been published successfully!</div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="primary">OK</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
