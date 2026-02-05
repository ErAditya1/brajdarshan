"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Map,
  Car,
  ShieldAlert,
  CircleCheck,
  User,
  Mail,
  Lock,
  Phone,
  KeyRound,
} from "lucide-react";
import { IconInput } from "@/components/ui/iconinput";

type RoleUI = "tourist" | "vendor" | "admin";

export default function RegisterPage() {
  const [role, setRole] = useState<RoleUI>("tourist");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Name, email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          password,
          role,
          adminKey: role === "admin" ? adminKey : undefined,
          preferences: {
            language,
            notifications,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Redirect or show success
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-orange-50 px-4 pt-24 pb-12">
      <div className="flex w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        {/* ================= LEFT ================= */}
        <div className="w-full lg:w-3/5 p-8 md:p-16">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 mb-8">
              Join Braj Darshan to explore or serve devotees.
            </p>

            {/* ================= ROLE SELECT ================= */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <RoleCard
                active={role === "tourist"}
                onClick={() => setRole("tourist")}
                title="Tourist"
                subtitle="Explore Places"
                icon={<Map />}
              />

              <RoleCard
                active={role === "vendor"}
                onClick={() => setRole("vendor")}
                title="Vendor"
                subtitle="Offer Services"
                icon={<Car />}
              />

              <RoleCard
                active={role === "admin"}
                onClick={() => setRole("admin")}
                title="Admin"
                subtitle="Manage Platform"
                icon={<ShieldAlert />}
                danger
              />
            </div>

            {/* ================= FORM ================= */}
            <form className="space-y-4" onSubmit={handleRegister}>
              <IconInput
                icon={<User />}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <IconInput
                icon={<Mail />}
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <IconInput
                icon={<Phone />}
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <IconInput
                icon={<Lock />}
                placeholder="Create Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Admin Secret */}
              {role === "admin" && (
                <IconInput
                  icon={<KeyRound />}
                  placeholder="Admin Secret Key"
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              )}

              {/* Preferences */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border rounded-xl px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  Notifications
                </label>
              </div>

              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 flex justify-center items-center gap-2 text-white bg-red-600 hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Sign Up Now"}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-red-600 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="hidden lg:block w-2/5 relative">
          <Image
            src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=1470&auto=format&fit=crop"
            alt="Indian Yatra"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}

/* ================= ROLE CARD ================= */

function RoleCard({
  title,
  subtitle,
  icon,
  active,
  danger,
  onClick,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  active?: boolean;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 relative ${
        active
          ? danger
            ? "border-red-500 bg-red-50"
            : "border-black bg-gray-50"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      {active && danger && (
        <CircleCheck className="absolute top-2 right-2 text-red-600 h-4 w-4" />
      )}

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
          danger
            ? "bg-red-200 text-red-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </div>

      <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
      <p className="text-[10px] text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
