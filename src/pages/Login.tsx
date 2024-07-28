import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonText,
} from "@ionic/react";
import MainHeader from "../components/Layout/Headers/MainHeader/MainHeader";
import { Capacitor } from "@capacitor/core";
import clsx from "clsx";

const isNative = Capacitor.isNativePlatform();

const Login: React.FC = () => {
  return (
    <IonPage id="login-page">
      <IonContent className="">
        <MainHeader />

        {/* <IonImg
            className="mx-auto"
            src="https://via.placeholder.com/150"
          ></IonImg> */}

        <IonCard
          className={clsx(
            `px-12 bg-transparent py-12 m-0 gap-0 lg:w-96 lg:px-0 lg:py-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:mx-auto lg:mt-8`
          )}
        >
          <IonCardHeader class="text-center mb-8 ">
            <IonCardTitle class="text-4xl font-bold">Campi 🏕️</IonCardTitle>
            <IonCardSubtitle class="text-lg">Welcome back!</IonCardSubtitle>
          </IonCardHeader>
          <form className="flex flex-col gap-2 lg:min-w-60">
            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter your email"
            ></IonInput>
            <IonInput
              label="Password"
              labelPlacement="floating"
              fill="outline"
              placeholder="********"
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
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
