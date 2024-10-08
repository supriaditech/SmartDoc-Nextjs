import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { useLogin } from "../../../hooks/useLogin";

function LoginForm() {
  // Gunakan hook useLogin yang sudah Anda buat
  const { register, handleSubmit, onSubmit, errors } = useLogin();

  return (
    <div className="relative z-10 mx-auto px-4 sm:px-32 w-full h-full">
      <div>
        <p className="text-white text-lg text-center md:text-2xl font-bold w-full">
          Selamat Datang di Tempat Belajar
        </p>
        <div className="text-lg md:text-xl text-white text-center my-2 md:my-4">
          Ayo Silahkan Masukkan Akun Kamu
        </div>

        {/* Form menggunakan react-hook-form */}
        <form
          onSubmit={handleSubmit(onSubmit)} // Hubungkan handleSubmit dan onSubmit dari react-hook-form
          className="my-3 md:my-1 flex flex-col gap-6  w-full"
        >
          {/* Input Email */}
          <p className="-mb-3 text-white text-sm md:text-md font-bold">
            Your Email
          </p>
          <Input
            crossOrigin={undefined}
            {...register("email", { required: "Email is required" })}
            size="lg"
            placeholder="name@mail.com"
            className={`!border-t-white focus:!border-t-gray-900 bg-white ${
              errors.email ? "border-red-500" : ""
            }`}
            labelProps={{
              className: "before:content-none after:content-none e",
            }}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          {/* Input
           Password */}
          <p className="-mb-3 text-white text-sm md:text-md font-bold">
            Password
          </p>
          <Input
            crossOrigin={undefined}
            {...register("password", { required: "Password is required" })} // Register input field
            type="password"
            size="lg"
            placeholder="********"
            className={`!border-t-white focus:!border-t-gray-900 bg-white ${
              errors.password ? "border-red-500" : ""
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          {/* Tombol Submit */}
          <Button type="submit" className="w-full my-4 bg-green-400">
            <p className="font-bold text-md">Login</p>
          </Button>
        </form>

        {/* Toast Notification */}
      </div>
    </div>
  );
}

export default LoginForm;
