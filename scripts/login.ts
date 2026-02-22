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

        await supabase.auth.signInWithOAuth({
            provider:"google"
        });

    });
}
