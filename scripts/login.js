// Import dari node_modules, bukan CDN
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  "https://quxxocbuublbbeyrtzmd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eHhvY2J1dWJsYmJleXJ0em1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDQ1NTQsImV4cCI6MjA4NjU4MDU1NH0.yC48vexwUOeOsv1-OU4evr9nWHH72c6Ey4PvojJIf3s"
);

// Update UI setelah login
function updateUIAfterLogin(user) {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    loginBtn.innerHTML = '<span class="login-text">Sign out?</span>';
    loginBtn.classList.add('logged-in');
    loginBtn.title = user.email || 'Logged in';
    
    // Store user data di window dan localStorage
    window.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Fire event agar UI update
    const event = new CustomEvent('userLoggedIn', { detail: user });
    window.dispatchEvent(event);
}

// Logout
async function logout() {
    await supabase.auth.signOut();

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.innerHTML = '<span class="login-text">Login</span>';
        loginBtn.classList.remove('logged-in');
        loginBtn.title = 'Login dengan Google';
    }
    
    // Clear user data
    delete window.currentUser;
    localStorage.removeItem('currentUser');
    
    // Fire event
    const event = new CustomEvent('userLoggedOut');
    window.dispatchEvent(event);
}

// Inisialisasi login
export async function initLogin() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    // cek session Supabase
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
        updateUIAfterLogin(session.user);
    }
    
    // Restore dari localStorage jika ada
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            window.currentUser = JSON.parse(savedUser);
            const event = new CustomEvent('userLoggedIn', { detail: window.currentUser });
            window.dispatchEvent(event);
        } catch (e) {
            console.debug('Failed to restore user from localStorage:', e);
        }
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

// Helper untuk load script Google Identity
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

// Ambil access token dari Google
async function getGoogleAccessToken() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || window.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
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
