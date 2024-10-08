import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoadingLogin(true);

    try {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      if (!signInResponse) {
        console.error("No response from server");
        throw new Error("No response from server");
      }

      // Cek apakah login berhasil
      if (signInResponse.ok && signInResponse.status === 200) {
        toast.success("Login successful!", { autoClose: 3000 });

        const cookies = parseCookies();
        let nextUrl = "/";

        if (cookies.nextSession) {
          const nextSessionObj = JSON.parse(cookies.nextSession);
          nextUrl = nextSessionObj.url;
          destroyCookie(null, "nextSession");
        } else {
          const raw = window.localStorage.getItem("nextSession") ?? "";

          if (raw !== "" && raw !== undefined && raw !== null) {
            const stored = JSON.parse(raw);
            if (stored) {
              nextUrl = String(stored?.url);
            }
          } else if (signInResponse.url) {
            nextUrl = String(signInResponse.url);
          }
        }

        router.push(nextUrl);
      } else {
        console.error("Login failed:", signInResponse.error); // Logging error pada signIn
        throw new Error(signInResponse.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error); // Logging error yang ditangkap
      toast.error(
        "Login failed, Silahkan masukan user id dan password yang benar",
        {
          autoClose: 3000,
        }
      );
      setLoadingLogin(false);
    }
  };

  return { register, handleSubmit, onSubmit, errors, loadingLogin };
};

export { useLogin };
