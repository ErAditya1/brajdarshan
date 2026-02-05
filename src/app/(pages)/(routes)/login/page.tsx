"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowRight, Sparkles, Quote } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1665680878111-9d14f3745a9e?q=80&w=1170&auto=format&fit=crop",
    title: "Sacred Waters of Yamuna",
    desc: "Let the holy river wash away your worries and bring inner peace.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1665413793441-13aedeb062d3?q=80&w=2158&auto=format&fit=crop",
    title: "Divine Symphony",
    desc: "Immerse yourself in the soulful rhythm of the evening Aarti.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=748&auto=format&fit=crop",
    title: "Ancient Sanctity",
    desc: "Step into the timeless realm of devotion and heritage.",
  },
  {
    image:
      "https://media.istockphoto.com/id/516984446/photo/varanasi-burning-grounds-at-night.jpg?s=2048x2048&w=is&k=20&c=uc2d_7vaGtAJJ9FrHuMtwNzaNmOwtc8GBTif85Aq_DI=",
    title: "Eternal Light",
    desc: "Where faith burns brighter than the lamps in the dark.",
  },
];

export default function LoginPage() {
  const [index, setIndex] = useState(1);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/"); // or /dashboard
    }
  };

  useEffect(() => {
    const i = setInterval(() => setIndex((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-yellow-50 to-orange-100 px-4 pt-20 pb-10">
      <div className="flex w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/60 relative z-10">
        {/* ================= LEFT : SLIDER ================= */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden bg-gray-900">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={s.image}
                alt="Braj Darshan"
                fill
                className="object-cover opacity-90 scale-105"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
            </div>
          ))}

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-20">
            <div className="bg-white/10 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center mb-6 border border-white/20 animate-bounce-slow">
              <Sparkles className="text-yellow-300 fill-yellow-300" />
            </div>

            <div className="h-28 relative">
              {slides.map((s, i) => (
                <div
                  key={s.title}
                  className={`absolute transition-all duration-1000 ${
                    i === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <h2 className="text-4xl font-serif font-bold mb-3 tracking-wide text-transparent bg-clip-text bg-linear-to-r from-white to-orange-100">
                    {s.title}
                  </h2>
                  <p className="text-lg text-gray-200 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    i === index ? "w-8 bg-orange-500" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT : FORM ================= */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />

          <div className="max-w-md mx-auto w-full relative z-10">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-2 font-serif">
                Welcome Back
              </h2>
              <p className="text-gray-500 flex items-center gap-2">
                Resume your spiritual journey
                <Quote
                  className="rotate-180 text-orange-400 fill-orange-400"
                  size={14}
                />
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email */}
              <Field
                label="Email Address"
                icon={<Mail />}
                type="email"
                placeholder="devotee@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <Field
                label="Password"
                icon={<Lock />}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                href={"/forgot-password"}
                className="mb-4 font-bold block float-end"
              >
                Forgot Password
              </Link>
              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-orange-900/20 transform hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-3 group"
              >
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight className="text-orange-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-orange-600 font-bold hover:text-orange-700 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Field Component                               */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  icon,
  ...props
}: {
  label: string;
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="group">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
        {label}
      </label>
      <div className="relative transition-all duration-300 transform group-focus-within:-translate-y-1">
        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 group-focus-within:text-orange-500 transition-colors">
          {icon}
        </div>
        <input
          {...props}
          required
          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
}
