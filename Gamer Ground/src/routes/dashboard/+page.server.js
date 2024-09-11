import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const isLoggedIn = cookies.get('auth');

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        throw redirect(302, '/login');
    }
}
