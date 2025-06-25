import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import { MessageCircle } from "lucide-react";

const Register = () => {
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setData({ ...data, [target.name]: target.value });
  };
  const { data, setData, processing, errors, post } = useForm({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/auth/register");
  };

  return (
    <>
      <Head title="Register" />
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="tel"
                value={data.name}
                name="name"
                onChange={onChangeHandler}
                placeholder="Enter your phone number"
                className="w-full"
              />
              <small
                className={
                  errors?.name ? "inline-block text-red-600 text-sm" : "hidden"
                }
              >
                {errors?.name}
              </small>
            </div>

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
                  errors?.phone ? "inline-block text-red-600 text-sm" : "hidden"
                }
              >
                {errors?.phone}
              </small>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={data.password}
                onChange={onChangeHandler}
                placeholder="Enter your password"
                name="password"
                className="w-full"
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
              Register
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Already have an account?
              <Link href="/login" className="text-green-600 hover:underline">
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
