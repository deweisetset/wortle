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

        try {
            const accessToken = await getGoogleAccessToken();

            const resp = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_token: accessToken })
            });

            const data = await resp.json();

            if (!resp.ok) throw new Error(data?.error || 'Auth failed');

            updateUIAfterLogin(data.user);
        } catch (err) {
            console.error('Login error:', err);
            alert('Login gagal: ' + String(err));
        }
    });
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector("script[src='" + src + "']")) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load ' + src));
        document.head.appendChild(s);
    });
}

async function getGoogleAccessToken() {
    const clientId = (window?.NEXT_PUBLIC_GOOGLE_CLIENT_ID) || (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    if (!clientId) throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID not set');

    await loadScript('https://accounts.google.com/gsi/client');

    return new Promise((resolve, reject) => {
        const google = window.google;
        if (!google || !google.accounts || !google.accounts.oauth2) {
            return reject(new Error('Google Identity library not available'));
        }

        const tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: 'openid email profile',
            callback: (resp) => {
                if (resp.error) return reject(resp);
                resolve(resp.access_token);
            }
        });

        tokenClient.requestAccessToken({ prompt: 'consent' });
    });
}
