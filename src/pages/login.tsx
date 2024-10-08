import LoginForm from "@/components/login/LoginFrom";
import Head from "next/head";
import Image from "next/image";
import React from "react";

function Login() {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="This is the login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="h-screen bg-customColor flex justify-center items-center px-4 sm:px-8 md:px-16 lg:px-20  py-20">
        <div
          className="bg-white flex flex-col justify-center items-center h-full w-full max-w-5xl rounded-lg shadow-lg px-4 py-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 123, 255, 0.2), rgba(0, 195, 255, 0.2))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)", // For Safari support
            borderRadius: "15px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Image
            src={"/assets/img/login.png"}
            width={400}
            height={400}
            alt="Ilusterasi Login"
            className="mb-4"
          />
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;
