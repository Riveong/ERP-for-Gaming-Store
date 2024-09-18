import { fail, redirect } from '@sveltejs/kit';
import { PRIVATE_AUTH_USERNAME, PRIVATE_AUTH_PASSWORD } from '$env/static/private';

export async function load({ cookies }) {
    const isLoggedIn = cookies.get('auth');
    if (isLoggedIn) {
        // Redirect to dashboard if already logged in
        throw redirect(302, '/dashboard');
    }
}

async function checkOtherAdmins(username, password) {
    // Make an API request to your backend to validate the admin credentials
    try {
        const response = await fetch(`http://localhost:3000/api/admin/${username}`, {
            method: 'GET',
            headers: {
                'password': password
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return { valid: false, message: 'Admin not found' };
            }
            if (response.status === 403) {
                return { valid: false, message: 'Invalid password' };
            }
            return { valid: false, message: 'Server error' };
        }

        const adminData = await response.json();
        return { valid: true, admin: adminData }; // Valid admin credentials

    } catch (error) {
        console.error('Error checking other admins:', error);
        return { valid: false, message: 'Network error' };
    }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        // Check credentials against environment variables
        if (username === PRIVATE_AUTH_USERNAME && password === PRIVATE_AUTH_PASSWORD) {
            // If credentials match the .env variables
            cookies.set('auth', 'true', { path: '/' });
            throw redirect(302, '/dashboard');
        }

        // Check credentials via the API if .env variables don't match
        const apiCheck = await checkOtherAdmins(username, password);
        if (apiCheck.valid) {
            cookies.set('auth', 'true', { path: '/' });
            throw redirect(302, '/dashboard');
        }

        // If neither check passes, return an error
        return alert(400, { message: apiCheck.message || 'Invalid credentials' });
    }
};
