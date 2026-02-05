"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft } from "lucide-react";
import { IconInput } from "@/components/ui/iconinput";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-orange-50 px-4 pt-24 pb-12">
      <div className="flex w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        {/* ================= LEFT (FORM) ================= */}
        <div className="w-full lg:w-3/5 p-8 md:p-16">
          <div className="max-w-xl mx-auto">
            {!sent ? (
              <>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h2>
                <p className="text-gray-500 mb-8">
                  Enter your email and we’ll send you a reset link.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <IconInput
                    icon={<Mail />}
                    placeholder="Email Address"
                    type="email"
                  />

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2 text-white  bg-red-600 hover:bg-red-700"
                  >
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              /* ================= SUCCESS STATE ================= */
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Check your inbox 📬
                </h2>
                <p className="text-gray-600 mb-8">
                  If an account exists for that email, a password reset link has
                  been sent.
                </p>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 font-bold text-black hover:underline"
                >
                  <ArrowLeft size={18} /> Back to Login
                </Link>
              </div>
            )}

            {/* Back to login (always visible when not sent) */}
            {!sent && (
              <p className="mt-8 text-center text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-bold text-black hover:underline"
                >
                  Log In
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* ================= RIGHT (IMAGE) ================= */}
        <div className="hidden lg:block w-2/5 relative">
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop"
            alt="Braj Path"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
          <div className="absolute bottom-0 left-0 right-0 p-12 bg-linear-to-t from-black/80 to-transparent text-white">
            <h3 className="text-3xl font-bold font-serif">
              Don’t worry.
            </h3>
            <p className="opacity-90 mt-2">
              Every journey allows a fresh start.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
