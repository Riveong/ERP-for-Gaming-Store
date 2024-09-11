import { fail, redirect } from '@sveltejs/kit';
import { PRIVATE_AUTH_USERNAME, PRIVATE_AUTH_PASSWORD } from '$env/static/private';

export async function load({ cookies }) {
    const isLoggedIn = cookies.get('auth');
    if (isLoggedIn) {
        // Redirect to dashboard if already logged in
        throw redirect(302, '/dashboard');
    }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        // Check credentials against environment variables
        if (username === PRIVATE_AUTH_USERNAME && password === PRIVATE_AUTH_PASSWORD) {
            cookies.set('auth', 'true', { path: '/' });
            throw redirect(302, '/dashboard');
        }

        return fail(400, { message: 'Invalid credentials' });
    }
};
