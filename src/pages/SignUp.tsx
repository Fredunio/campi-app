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
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupHeader from "../components/Layout/Headers/SignupHeader/SignupHeader";
import {
  signInWithDiscord,
  signInWithFacebook,
  signInWithGoogle,
} from "../lib/auth";
import useSupabaseBrowser from "../database/client";

const isNative = Capacitor.isNativePlatform();

const signUpSchema: ZodType = z.object({
  email: z.string().email(),
  // password must be at least 8 characters long and contain at least
  // one uppercase letter, one lowercase letter, and one special character
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long")
    .superRefine((password, ctx) => {
      const capitalLetter = /[A-Z]/.test(password);
      if (!capitalLetter) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          message: "Password must contain at least one uppercase letter",
          validation: "base64",
        });
      }

      const lowercaseLetter = /[a-z]/.test(password);
      if (!lowercaseLetter) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          message: "Password must contain at least one lowercase letter",
          validation: "base64",
        });
      }

      const specialCharacter = /[!@#$%^&*]/.test(password);
      if (!specialCharacter) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          message: "Password must contain at least one special character",
          validation: "base64",
        });
      }
      return "Password must contain at least one uppercase letter, one lowercase letter, and one special character";
    }),
});

type SchemaProps = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const supabaseClient = useSupabaseBrowser();
  console.log("pwd:", watch("password"));

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
            onSubmit={handleSubmit((data: SchemaProps) => {
              console.log(data);
            })}
            className="flex flex-col gap-2 lg:min-w-60"
          >
            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            ></IonInput>
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
              {...register("password", { required: true })}
            ></IonInput>
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
