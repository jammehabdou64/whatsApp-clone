import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

import { Input } from "@/Components/ui/input";

import { useForm } from "@inertiajs/react";
import { MessageCircle } from "lucide-react";

const Login = () => {
  const { data, errors, setData, processing, post } = useForm({
    phone: "",
    password: "",
    email: "",
  });

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setData({ ...data, [target.name]: target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/auth/login");
  };

  return (
    <>
      <Head title="Login" />

      <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              WhatsApp Web
            </h1>
            <p className="text-gray-600">Enter your details to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                value={data.phone}
                name="phone"
                onChange={onChangeHandler}
                placeholder="Enter your phone number"
                className="w-full"
              />
              <small
                className={
                  errors?.phone || errors?.email
                    ? "inline-block text-red-600 text-sm"
                    : "hidden"
                }
              >
                {errors?.phone || errors?.email}
              </small>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="text"
                value={data.password}
                onChange={onChangeHandler}
                placeholder="Enter your password"
                className="w-full"
                name="password"
              />
              <small
                className={
                  errors?.password
                    ? "inline-block text-red-600 text-sm"
                    : "hidden"
                }
              >
                {errors?.password}
              </small>
            </div>

            <Button
              onClick={submit}
              disabled={processing}
              className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Continue to WhatsApp
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="text-green-600 hover:underline">
                register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
