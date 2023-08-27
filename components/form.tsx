"use client";

import React, { useEffect, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import LoadingDots from "../components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const {data:session, status} = useSession();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            prnNumber: e.currentTarget.prnNumber.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(async ({ error }) => {
            if (error) {
              setLoading(false);
              toast.error(error);
            }
            const session = await getSession();
            const userRole = session?.user.role;

            if (userRole === "admin") {
              router.push("/Dashboard");
            } else {
              router.refresh();
              router.push("/");
            }
          });
        } else {
          fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: e.currentTarget.Name.value,
              prnNumber: e.currentTarget.prnNumber.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success("Data Submitted");
              router.refresh();
            } else {
              const { error } = await res.json();
              toast.error(error);
            }
          });
        }
      }}
      className="flex  flex-col space-y-4 p-5 sm:px-16"
    >
      {type === "register" ? (
        <div className="flex items-center justify-center mx-auto max-w ">
          <div className="flex flex-col sm:flex-row gap-1">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                NAME
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                PRN NUMBER
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="prnNumber"
                  id="prnNumber"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                PASSWORD
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="password"
                  id="password"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                disabled={loading}
                className={`${
                  loading
                    ? "cursor-not-allowed border-black px-5 py-3.5 bg-white"
                    : "border-white bg-indigo-600 text-white font-semibold text-sm px-5 py-3.5 py hover:bg-white hover:text-black hover:border-black"
                } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
              >
                {loading ? <LoadingDots color="#808080" /> : <p>ADD</p>}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <label
              htmlFor="prnNumber"
              className="block text-xs text-white uppercase"
            >
              prnNumber
            </label>
            <input
              id="prnNumber"
              name="prnNumber"
              type="prnNumber"
              placeholder=""
              required
              className="mt-1 block w-full bg-transparent rounded-md border  px-3 py-2  shadow-sm focus:border-white  focus:ring-white sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-white uppercase"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-white px-3 py-2 bg-transparent shadow-sm focus:border-white  focus:ring-white sm:text-sm"
            />
          </div>
          <button
            disabled={loading}
            className={`${
              loading
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-black bg-white text-black hover:bg-white hover:text-black"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {loading ? <LoadingDots color="#808080" /> : <p>Sign In</p>}
          </button>
        </>
      )}
    </form>
  );
}
