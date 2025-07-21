import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Users } from "../data/Users";
import { useLoginContext } from "../context/LoginContext";
import "../styles/Login.scss";
import { useState } from "react";

export type LogInForm = {
  email: string;
  password: string;
};

const loginPageValidationSchema = z.object({
  email: z.string().email("incorrect email"),
  password: z.string(),
});

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useLoginContext();
  const [authError, setAuthError] = useState("");

  const {
    register,
    // watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>({
    resolver: zodResolver(loginPageValidationSchema),
    mode: "onTouched",
  });

  //const { email, password } = watch();

  const onSubmit = async ({ email, password }: LogInForm) => {
    const matchedUser = Users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (matchedUser) {
      setIsLoggedIn(true);
      localStorage.setItem("loggedUserName", matchedUser.name);
      navigate("/"); //if login success, let me see ToDo page, redirect to ToDo page for new task creation
    } else {
      setAuthError("Email or password is incorrect");
      setIsLoggedIn(false);
      localStorage.removeItem("loggedUserName");
    }
  };

  return (
    <div className="center-container ">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Insert email"
          className={errors.email || authError ? "input-error" : ""}
          {...register("email")}
        />
        {errors.email && (
          <p className="error-message">{errors.email?.message}</p>
        )}
        <input
          type="password"
          placeholder="Insert password"
          className={errors.password || authError ? "input-error" : ""}
          {...register("password")}
        />
        {authError && <p className="error-message">{authError}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
