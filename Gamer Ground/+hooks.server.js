export const handle = async ({ event, resolve }) => {
  const isDashboardRoute = event.url.pathname.startsWith('/dashboard');
  const isAdmin = event.cookies.get('admin');

  // Existing logic for checking admin access
  if (isDashboardRoute && !isAdmin) {
      return new Response(null, { status: 302, headers: { Location: '/admin-login' } });
  }

  // New logic for checking general login status
  const isLoginRoute = event.url.pathname.startsWith('/dashboard'); // Adjust if necessary
  const isLogin = event.cookies.get('isLogin');

  if (isLoginRoute && !isLogin) {
      return new Response(null, { status: 302, headers: { Location: '/signin' } });
  }

  // Proceed with resolving the request
  return resolve(event);
};
