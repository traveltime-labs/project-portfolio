<script lang="ts" setup>
import { onMounted } from "vue";

declare global {
    interface Window {
        handleCredentialResponse: (response: any) => void;
        google?: any;
    }
}

const google_clientId = "227137729697-s5qc74gs7thliucho86fgl00ja7j0tg4.apps.googleusercontent.com";
const google_redirectUri = "http://localhost:5173/callback";

const loadGoogleScript = () => {
    return new Promise<void>((resolve) => {
        if (document.getElementById("google-sdk")) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.id = "google-sdk";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
    });
};

const initGoogleLogin = async () => {
    console.log("initGoogleLogin");

    await loadGoogleScript();

  
    window.handleCredentialResponse = (response: any) => {
        console.log("Google ID Token:", response.credential);
    };

    if (window.google) {
        window.google.accounts.id.initialize({
            client_id: google_clientId,
            callback: window.handleCredentialResponse,
            auto_select: false,  // 👈 關閉自動選帳號
            cancel_on_tap_outside: true  // 點外面就會關閉
        });

        window.google.accounts.id.renderButton(
            document.querySelector("button")!,
            { theme: "outline", size: "large" }
        );

        window.google.accounts.id.prompt({
            select_by: "user" // 👈 強制使用者選帳號
        });
    }
};

const loginWithGoogle = () => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?response_type=token" +
    "&client_id=" + google_clientId +
    "&redirect_uri=" + encodeURIComponent(google_redirectUri) +
    "&scope=openid%20email%20profile" +
    "&prompt=select_account"; // 👈 強制跳帳號選擇器

  window.location.href = url;
};
</script>

<template>
    <admin-layout>
        <ComponentCard :isShowHeader="false" title="第三方練習">
            <button @click="loginWithGoogle">google 登入-</button>
        </ComponentCard>
    </admin-layout>
</template>
