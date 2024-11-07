import useAuth from "@/hooks/useAuth/useAuth";
import { IonSpinner } from "@ionic/react";
import { ComponentType } from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface ProtectedAuthRouteProps extends RouteProps {
  component?: ComponentType<any>;
  render?: (props: any) => React.ReactNode;
}
const ProtectedAuthRoute: React.FC<ProtectedAuthRouteProps> = ({
  component: Component,
  render,
  ...rest
}) => {
  const { loading, user } = useAuth();
  // console.log("ProtectedAuthRoute", { loading, user });
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) return <IonSpinner name="dots" />;
        return user ? (
          Component ? (
            <Component {...props} />
          ) : render ? (
            render(props)
          ) : null
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default ProtectedAuthRoute;
