"use client";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoginMutation } from "@/redux/queries/auth/authApi";
import PageLoadingSpinner from "@/src/components/layouts/PageLoadingSpinner";
import InlineSpinner from "@/src/components/layouts/inlineSpinner";
import { IoLockClosedOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import Image from "next/image";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [login, { data, error, isSuccess, isLoading }] = useLoginMutation();
  const router = useRouter();

  const loginSchema = z.object({
    email: z.string().nonempty("Email is required"),
    password: z.string().min(4, "Password must be atleast 6 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;
    try {
      const response = await login(data).unwrap();
      console.log("response", response);
      const successMessage = response?.message || "Login successful";
      toast.success(successMessage);
    } catch (error: any) {
      if (error?.data?.error) {
        console.log("error", error);
        toast.error(error.data.error);
      }
    }
  };
  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      setRedirecting(true);
      console.log("user", user);
      
      if (user && !user.role) {
        router.push("/");
      } else if (user && user.role === "influencer") {
        router.push("/influencer-dashboard");
      } else if (user && user.role === "brand") {
        router.push("/brand-dashboard");
      }
    }
  }, [isSuccess, router, user, user?.role]);

  return (
    <>
      {redirecting ? (
        <div className="text-center  h-screen flex flex-col justify-center bg-white items-center">
          <InlineSpinner />
        </div>
      ) : (
        <div className="bg-[#F4F7FA] h-screen flex items-center justify-center p-4 ">
          <div className=" flex justify-center items-center py-10 mx-auto min-h-screen">
            <div className="bg-white lg:p-8 md:p-8 p-5 shadow-lg rounded-md w-full max-w-md   ">
           
              <div className="flex items-center py-3">
                <hr className="flex-grow border-gray-300" />
                <h3 className="px-4 text-[#1F4772] text-center">
                  Sign in to your Account
                </h3>
                <hr className="flex-grow border-gray-300" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="capitalize text-xl mb-3">
                    {/* <label>email</label> */}
                  </div>
                  <div className=" relative">
                    <span className="absolute px-3 inset-y-0 left-0 flex items-center text-gray-400">
                      <BiUser size={24} color="" />
                    </span>

                    <input
                      className="w-full placeholder:capitalize px-10 py-3 border border-gray-300 focus:outline-none focus:border-blue-300 focus:bg-white text-lg text-gray-900 rounded-md"
                      type="text"
                      {...register("email")}
                      placeholder="enter email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <div className="capitalize text-xl mb-3">
                    {/* <label>password</label> */}
                  </div>
                  <div className="relative">
                    <span className="absolute px-3 inset-y-0 left-0 flex items-center text-gray-400">
                      <IoLockClosedOutline size={24} color="" />
                    </span>
                    <input
                      className="w-full placeholder:capitalize px-10 py-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:bg-white text-lg rounded-md "
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="enter password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500">
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between py-5">
                  <div className="flex  items-center space-x-2">
                    <input
                      type="checkbox"
                      className="lg:w-5 lg:h-5 md:w-5 md:h-5 h-3 w-3"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="text-gray-700 text-xs lg:text-sm md:text-sm">
                      Show Password
                    </span>
                  </div>

                 
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-[#28d196ff] text-xl text-white font-medium lg:py-4 md:py-4 py-3 rounded-lg w-full opacity-90 hover:opacity-100 flex items-center justify-center"
                  >
                    
                    <span className="lg:text-xl md:text-xl text-lg font-light">
                      {isSubmitting ? (
                        <div className="flex space-x-2 animate-pulse">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <IoLockClosedOutline
                      size={23}
                      className="text-white mr-2"
                    />
                    <span>Login</span>
                        </div>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default LoginPage;
