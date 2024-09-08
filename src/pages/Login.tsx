import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonImg,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonText,
} from "@ionic/react";
import { Capacitor } from "@capacitor/core";
import clsx from "clsx";
import LoginHeader from "../components/Layout/Headers/LoginHeader/LoginHeader";
import {
  signInWithDiscord,
  signInWithFacebook,
  signInWithGoogle,
} from "../lib/auth";
import useSupabaseBrowser from "../database/client";

const isNative = Capacitor.isNativePlatform();

const Login: React.FC = () => {
  const supabaseClient = useSupabaseBrowser();

  return (
    <IonPage id="login-page">
      <LoginHeader />
      <IonContent fullscreen>
        <IonCard
          className={clsx(
            `px-12 bg-transparent py-4 m-0 gap-0 lg:w-96 lg:px-0 lg:py-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:mx-auto lg:mt-8`
          )}
        >
          <IonCardHeader class="text-center mb-4 ">
            <IonCardTitle class="text-4xl font-bold">Campi 🏕️</IonCardTitle>
            <IonCardSubtitle class="text-lg">Welcome back!</IonCardSubtitle>
          </IonCardHeader>
          <form className="flex flex-col gap-2 lg:min-w-60">
            <IonInput
              type="email"
              label="Email"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter your email"
            ></IonInput>
            <IonInput
              type="password"
              label="Password"
              labelPlacement="floating"
              fill="outline"
              placeholder="********"
            ></IonInput>
            <IonButton
              className="font-semibold"
              color={"success"}
              expand="full"
              type="submit"
              size={isNative ? "large" : "default"}
            >
              Log in
            </IonButton>
          </form>

          <IonText className="mt-4 text-center">
            <p>or continue with</p>
          </IonText>
          <div className="flex items-center justify-between gap-4">
            <IonButton
              color={"dark"}
              expand="full"
              size={isNative ? "large" : "default"}
              onClick={() => signInWithGoogle(supabaseClient)}
              shape="round"
              className="rounded-full"
            >
              <IonImg
                src="/images/logos/google.png"
                alt="Google login"
                className="w-6 h-6"
              />
            </IonButton>

            <IonButton
              color={"dark"}
              expand="full"
              shape="round"
              size={isNative ? "large" : "default"}
              onClick={() => signInWithFacebook(supabaseClient)}
            >
              <IonImg
                src="/images/logos/facebook.png"
                alt="Facebook login"
                className="w-6 h-6"
              />
            </IonButton>
            <IonButton
              color={"dark"}
              expand="full"
              shape="round"
              size={isNative ? "large" : "default"}
              onClick={() => signInWithDiscord(supabaseClient)}
            >
              <IonImg
                src="/images/logos/discord.png"
                alt="Discord login"
                className="w-6 h-6"
              />
            </IonButton>
          </div>

          <div className="mt-8 text-center">
            <IonText className="">
              <p>
                Forgot your password? <a href="/forgot-password">Reset</a>
              </p>
            </IonText>
            <IonText className="">
              <p>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </IonText>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
