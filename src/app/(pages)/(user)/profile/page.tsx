"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Shield,
  LogOut,
  BadgeCheck,
  Globe,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */
interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  avatar: {
    url: string;
  };
  authProvider: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
  preferences?: {
    language?: string;
    notifications?: boolean;
  };
}

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */
export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- FETCH USER FROM API ---------------- */
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (status === "loading") return null;
  if (!session?.user) redirect("/login");

  if (loading || !user) return null;

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  /* ---------------- SAVE PROFILE ---------------- */
  const saveProfile = async () => {
    setSaving(true);

    await fetch("/api/user/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        phone: user.phone,
        address: user.address,
        preferences: user.preferences,
      }),
    });

    setSaving(false);
    alert("Profile updated successfully");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      // 1️⃣ Upload to ImageKit
      const uploadRes = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });

      console.log(uploadRes)

      const uploadData = await uploadRes.json();

      console.log(uploadData)

      if (!uploadRes.ok) throw new Error(uploadData.message);

      // 2️⃣ Save avatar URL to user
      const saveRes = await fetch("/api/user/avatar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar: {
            url:uploadData.url,
            imageFileId:uploadData.fileId
          },
        }),
      });

      if (!saveRes.ok) throw new Error("Avatar save failed");

      // 3️⃣ Update UI instantly
      setUser((prev) => (prev ? { ...prev, avatar: {url:uploadData.url} } : prev));
    } catch (err) {
      console.error(err);
      alert("Avatar upload failed");
    }
  };

  return (
    <main className="container max-w-5xl mx-auto py-12 space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-orange-600">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account & personal information
        </p>
      </div>

      {/* ================= USER CARD ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-5 py-4">
          {/* ================= AVATAR ================= */}
          <div className="relative group">
            <div
              className="w-20 h-20 rounded-full overflow-hidden bg-orange-100
    flex items-center justify-center text-orange-600 font-bold text-2xl"
            >
              {user.avatar ? (
                <img
                  src={user.avatar.url}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            {/* Upload Button Overlay */}
            <label
              className="absolute inset-0 bg-black/40 text-white text-xs
    flex items-center justify-center opacity-0
    group-hover:opacity-100 cursor-pointer transition rounded-full"
            >
              Change
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 mb-1">
              {user.name}
              {user.isVerified && (
                <BadgeCheck className="text-green-500" size={18} />
              )}
            </CardTitle>

            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail size={14} /> {user.email}
            </p>

            {user.phone && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Phone size={14} /> {user.phone}
              </p>
            )}
          </div>

          <span
            className="px-3 py-1 rounded-full text-xs font-semibold
          bg-orange-100 text-orange-700 capitalize"
          >
            {user.role}
          </span>
        </CardHeader>
      </Card>

      {/* ================= BASIC INFO ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">
          <Input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Full Name"
          />

          <Input value={user.email} disabled />

          <Input
            value={user.phone || ""}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            placeholder="Phone number"
          />

          <Input
            value={user.address?.city || ""}
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, city: e.target.value },
              })
            }
            placeholder="City"
          />

          <Input
            value={user.address?.state || ""}
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, state: e.target.value },
              })
            }
            placeholder="State"
          />

          <Input
            value={user.address?.country || "India"}
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, country: e.target.value },
              })
            }
            placeholder="Country"
          />
        </CardContent>
      </Card>

      {/* ================= PREFERENCES ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-orange-500" />
              <span className="text-sm font-medium">Language</span>
            </div>
            <span className="text-sm capitalize">
              {user.preferences?.language || "English"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-orange-500" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <Switch
              checked={user.preferences?.notifications ?? true}
              onCheckedChange={(v) =>
                setUser({
                  ...user,
                  preferences: { ...user.preferences, notifications: v },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= ACCOUNT DETAILS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Account & Security</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-orange-500" />
            <span className="font-medium">Role:</span>
            <span className="capitalize">{user.role}</span>
          </div>

          <div className="flex items-center gap-2">
            <BadgeCheck size={16} className="text-green-500" />
            <span className="font-medium">Verified:</span>
            <span>{user.isVerified ? "Yes" : "No"}</span>
          </div>

          <div className="flex items-center gap-2">
            <User size={16} className="text-orange-500" />
            <span className="font-medium">Auth Provider:</span>
            <span className="capitalize">{user.authProvider}</span>
          </div>

          {user.isBlocked && (
            <p className="text-red-600 font-semibold">
              ⚠ Your account is currently blocked
            </p>
          )}
        </CardContent>
      </Card>

      {/* ================= ACTIONS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-4">
          <Button onClick={saveProfile} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            variant="destructive"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
