import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    // Delete the authentication cookie
    cookies.delete('auth', { path: '/' });

    // Redirect the user to the login page
    throw redirect(302, '/login');
}
