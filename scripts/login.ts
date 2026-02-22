import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://quxxocbuublbbeyrtzmd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eHhvY2J1dWJsYmJleXJ0em1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDQ1NTQsImV4cCI6MjA4NjU4MDU1NH0.yC48vexwUOeOsv1-OU4evr9nWHH72c6Ey4PvojJIf3s"
);

function updateUIAfterLogin(user:any){
    const btn=document.getElementById("loginBtn");
    if(!btn) return;

    btn.innerHTML="Sign out?";
    btn.classList.add("logged-in");
    btn.title=user.email;
}

async function logout(){
    await supabase.auth.signOut();
    location.reload();
}

export async function initLogin(){

    const btn=document.getElementById("loginBtn");
    if(!btn) return;

    const {data:{session}} = await supabase.auth.getSession();

    if(session?.user){
        updateUIAfterLogin(session.user);
    }

    btn.addEventListener("click", async()=>{

        const {data:{session}} = await supabase.auth.getSession();

        if(session){
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

async function loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load ' + src));
        document.head.appendChild(s);
    });
}

async function getGoogleAccessToken(): Promise<string> {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
    if (!clientId) throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID not set');

    await loadScript('https://accounts.google.com/gsi/client');

    return new Promise((resolve, reject) => {
        const google = (window as any).google;
        if (!google || !google.accounts || !google.accounts.oauth2) {
            return reject(new Error('Google Identity library not available'));
        }

        const tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: 'openid email profile',
            callback: (resp: any) => {
                if (resp.error) return reject(resp);
                resolve(resp.access_token);
            }
        });

        tokenClient.requestAccessToken({ prompt: 'consent' });
    });
}
