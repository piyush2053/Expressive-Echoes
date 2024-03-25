import { URL } from './constants.js'
export async function submitFormData(data: { name: string; email: string; password: string; netImg: string }) {
    try {
        const response = await fetch('https://renteasy-be.onrender.com/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error submitting form data:', error);
        throw new Error('Error submitting form data');
    }
}


export async function loginUser(email: string, password: string) {
    try {
        const response = await fetch('https://renteasy-be.onrender.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Error logging in');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error('Error logging in');
    }
}

export async function fetchUserDataByEmail(email: string) {
    try {
        const response = await fetch(`https://renteasy-be.onrender.com/name/${email}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.data && data.body) {
            return { name: data.data, netImg: data.body };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Error fetching user data');
    }
}

export async function deleteBlog(id: number) {
    try {
        const isLocalhost = window.location.href.includes('localhost');
        const apiURL = isLocalhost ? URL.DELETE_BLOG_LOCAL : URL.DELETE_BLOG_PROD;
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            return true
        }
    } catch (error) {
        console.error('Error fetching deleting data:', error);
        throw new Error('Error');
    }
}
