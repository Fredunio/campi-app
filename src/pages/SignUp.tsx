import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonImg,
  IonInput,
  IonPage,
  IonText,
  useIonToast,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { Capacitor } from "@capacitor/core";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import SignupHeader from "../components/Layout/Headers/SignupHeader/SignupHeader";
import {
  signInWithDiscord,
  signInWithFacebook,
  signInWithGoogle,
  signUpWithEmail,
} from "../lib/auth";
import useSupabaseBrowser from "../database/client";
import { useCallback, useEffect, useState } from "react";
import { signupSchema } from "@/lib/schemas/signupSchema";
import { TSignupSchema } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRedirectTo } from "@/hooks/useRedirectTo";
import { useHistory } from "react-router";

const isNative = Capacitor.isNativePlatform();

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });

  const supabaseClient = useSupabaseBrowser();

  const [presentToast] = useIonToast();
  const [redirectTo] = useRedirectTo();
  const history = useHistory();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signInWithGoogle(supabaseClient);
    } catch (error) {
      console.error(error);
      presentToast({
        message: "An error occurred while signing in with Google",
        color: "danger",
      });
    }
  }, [supabaseClient, presentToast]);

  const handleFacebookSignIn = useCallback(async () => {
    try {
      await signInWithFacebook(supabaseClient);
    } catch (error) {
      console.error(error);
      presentToast({
        message: "An error occurred while signing in with Facebook",
        color: "danger",
      });
    }
  }, [supabaseClient, presentToast]);

  const handleDiscordSignIn = useCallback(async () => {
    try {
      await signInWithDiscord(supabaseClient);
    } catch (error) {
      console.error(error);
      presentToast({
        message: "An error occurred while signing in with Discord",
        color: "danger",
      });
    }
  }, [supabaseClient, presentToast]);

  const handleEmailSignUp = useCallback(
    async (data: TSignupSchema) => {
      try {
        await signUpWithEmail(supabaseClient, data.email, data.password);
        history.replace(redirectTo);
      } catch (error) {
        console.error(error);
        presentToast({
          message: "An error occurred while signing up with email",
          color: "danger",
        });
      }
    },
    [supabaseClient, presentToast]
  );

  return (
    <IonPage id="login-page">
      <SignupHeader />
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
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(async (data: TSignupSchema) => {
                console.log("data", data);
                await handleEmailSignUp(data);
              })();
            }}
            className="flex flex-col gap-2 lg:min-w-60"
          >
            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors?.email?.message && (
              <IonText color={"danger"}>
                <p>{errors.email.message}</p>
              </IonText>
            )}
            <IonInput
              label="Password"
              labelPlacement="floating"
              fill="outline"
              placeholder="********"
              type="password"
              clearOnEdit={false}
              {...register("password")}
            />
            {errors?.password?.message && (
              <IonText color={"danger"}>
                <p>{errors.password.message}</p>
              </IonText>
            )}
            <IonButton
              className="font-semibold"
              color={"primary"}
              expand="full"
              type="submit"
              size={isNative ? "large" : "default"}
            >
              Sign Up
            </IonButton>
          </form>
          <IonText className="mt-4 text-center">
            <p>or</p>
          </IonText>
          <div className="flex items-center justify-between gap-4">
            <IonButton
              color={"dark"}
              expand="full"
              size={isNative ? "large" : "default"}
              onClick={() => handleGoogleSignIn()}
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
              onClick={() => handleFacebookSignIn()}
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
              onClick={() => handleDiscordSignIn()}
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
                Already a member? <a href="/login">Log in</a>
              </p>
            </IonText>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
