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
  signInWithPassword,
} from "../lib/auth";
import useSupabaseBrowser from "../database/client";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { authSchema } from "@/lib/schemas/authSchema";
import { TAuthSchema } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, useLocation } from "react-router";

const isNative = Capacitor.isNativePlatform();

const Login: React.FC = () => {
  const supabase = useSupabaseBrowser();
  const history = useHistory();
  const location = useLocation<{ redirectTo: string | undefined | null }>();
  // location.state.redirectTo

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(authSchema),
    mode: "onBlur",
  });

  const handleEmailLogin = useCallback(
    async (data: TAuthSchema) => {
      await signInWithPassword(supabase, data.email, data.password);
      const redirectPath = location.state?.redirectTo || "/dashboard";
      history.replace(redirectPath);
    },
    [history, location.state, supabase]
  );

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
          <form
            // onSubmit={handleSubmit(handleEmailLogin)}
            onSubmit={(e) => {
              e.preventDefault();
              console.log("handleSubmit");
              handleSubmit(async (data: TAuthSchema) => {
                console.log("data", data);
                await handleEmailLogin(data);
              })();
            }}
            className="flex flex-col gap-2 lg:min-w-60"
          >
            <IonInput
              type="email"
              label="Email"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter your email"
              {...register("email")}
            ></IonInput>

            {errors?.email?.message && (
              <IonText color={"danger"}>
                <p>{errors.email.message}</p>
              </IonText>
            )}
            <IonInput
              type="password"
              label="Password"
              labelPlacement="floating"
              fill="outline"
              placeholder="********"
              {...register("password")}
            ></IonInput>

            {errors?.password?.message && (
              <IonText color={"danger"}>
                <p>{errors.password.message}</p>
              </IonText>
            )}
            <IonButton
              className="font-semibold rounded-xl"
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
              onClick={() => signInWithGoogle(supabase)}
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
              onClick={() => signInWithFacebook(supabase)}
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
              onClick={() => signInWithDiscord(supabase)}
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
