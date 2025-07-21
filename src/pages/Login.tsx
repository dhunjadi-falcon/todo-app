import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Users } from "../data/Users";
import { useLoginContext } from "../context/LoginContext";
import "../styles/Login.scss";

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

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>({
    resolver: zodResolver(loginPageValidationSchema),
    mode: "onTouched",
  });

  const { email, password } = watch();
  console.log(email, password);

  const onSubmit = async ({ email, password }: LogInForm) => {
    const matchedUser = Users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (matchedUser) {
      console.log("Login successful");
      setIsLoggedIn(true);
      localStorage.setItem("loggedUserName", matchedUser.name);
      navigate("/todo"); //if login success, let me see ToDo page, redirect to ToDo page
    } else {
      alert("Invalid credentials");
      setIsLoggedIn(false);
      localStorage.removeItem("loggedUserName");
      navigate("/login");
    }
  };

  return (
    <div className="center-container ">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Insert email" {...register("email")} />
        <input
          type="password"
          placeholder="Insert password"
          {...register("password")}
        />
        {errors.email?.message}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
