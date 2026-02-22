import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://quxxocbuublbbeyrtzmd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eHhvY2J1dWJsYmJleXJ0em1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDQ1NTQsImV4cCI6MjA4NjU4MDU1NH0.yC48vexwUOeOsv1-OU4evr9nWHH72c6Ey4PvojJIf3s"
);

function updateUIAfterLogin(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    loginBtn.innerHTML = '<span class="login-text">Sign out?</span>';
    loginBtn.classList.add('logged-in');
    loginBtn.title = user.email || 'Logged in';
}

async function logout() {
    await supabase.auth.signOut();

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.innerHTML = '<span class="login-text">Login</span>';
        loginBtn.classList.remove('logged-in');
        loginBtn.title = 'Login dengan Google';
    }
}

export async function initLogin() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
        updateUIAfterLogin(session.user);
    }

    loginBtn.addEventListener('click', async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            logout();
            return;
        }

        await supabase.auth.signInWithOAuth({
            provider: "google"
        });
    });
}
