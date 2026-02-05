"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload";
import type { PlaceTimings } from "@/types/place";
import { useToast } from "@/components/ui/toast-provider";
import { useRouter } from "next/navigation";

type PlaceType = "Temple" | "Ghat" | "Forest" | "Pilgrimage";
type Status = "draft" | "published";

export default function EditPlaceForm({ place }: { place: any }) {
  const toast = useToast();
  const router = useRouter();

  /* ---------------- BASIC ---------------- */
  const [name, setName] = useState(place.name);
  const [slug, setSlug] = useState(place.slug);
  const [type, setType] = useState<PlaceType>(place.type);
  const [location, setLocation] = useState(place.location);
  const [lat, setLat] = useState(String(place.geo?.lat || ""));
  const [lng, setLng] = useState(String(place.geo?.lng || ""));
  const [image, setImage] = useState(place.image?.url || "");
  const [imageFileId, setImageFileId] = useState(
    place.image?.imageFileId || ""
  );
  const [description, setDescription] = useState(place.description || "");
  const [history, setHistory] = useState(place.history || "");
  const [status, setStatus] = useState<Status>(place.status || "draft");

  /* ---------------- COMPLEX ---------------- */
  const [timings, setTimings] = useState<PlaceTimings>(
    place.timings || []
  );

  const [importantTips, setImportantTips] = useState<string[]>(
    place.importantTips || []
  );

  const [howToReach, setHowToReach] = useState(
    place.howToReach || {
      byRoad: "",
      byRail: "",
      byAir: "",
      localTransport: "",
    }
  );

  /* ---------------- UPDATE ---------------- */
  const updatePlace = async (finalStatus: Status) => {
    try {
      const res = await fetch(`/api/places/${place._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          type,
          location,
          geo: {
            lat: Number(lat),
            lng: Number(lng),
          },
          image,
          imageFileId,
          description,
          history,
          timings,
          importantTips,
          howToReach,
          status: finalStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Update failed",
          description: data.message || "Something went wrong",
          
        });
        return;
      }

      toast({
        title: "Place updated",
        description: "All changes saved successfully",
      });

      router.push(`/places/${slug}`);
    } catch {
      toast({
        title: "Network error",
        description: "Unable to update place",
       
      });
    }
  };

  /* ---------------- HELPERS ---------------- */
  const addTip = () => setImportantTips((t) => [...t, ""]);
  const updateTip = (i: number, v: string) =>
    setImportantTips((t) => t.map((tip, idx) => (idx === i ? v : tip)));
  const removeTip = (i: number) =>
    setImportantTips((t) => t.filter((_, idx) => idx !== i));

  const addSeason = () =>
    setTimings((t) => [
      ...t,
      { season: "Summer", validFrom: "Post-Holi", rows: [""] },
    ]);

  const updateSeasonField = (
    i: number,
    key: "season" | "validFrom",
    value: string
  ) => {
    const copy = [...timings];
    copy[i][key] = value;
    setTimings(copy);
  };

  const updateRow = (i: number, j: number, v: string) => {
    const copy = [...timings];
    copy[i].rows[j] = v;
    setTimings(copy);
  };

  const addRow = (i: number) => {
    const copy = [...timings];
    copy[i].rows.push("");
    setTimings(copy);
  };

  const removeRow = (i: number, j: number) => {
    const copy = [...timings];
    copy[i].rows.splice(j, 1);
    setTimings(copy);
  };

  const removeSeason = (i: number) =>
    setTimings((t) => t.filter((_, idx) => idx !== i));

  /* ---------------- UI ---------------- */
  return (
    <main className="max-w-5xl mx-auto py-10 space-y-10">
      
      {/* BASIC DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as PlaceType)}
            className="border rounded px-3 py-2"
          >
            <option>Temple</option>
            <option>Ghat</option>
            <option>Forest</option>
            <option>Pilgrimage</option>
          </select>

          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* MAP */}
      <Card>
        <CardHeader>
          <CardTitle>Map Coordinates</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Input value={lat} onChange={(e) => setLat(e.target.value)} />
          <Input value={lng} onChange={(e) => setLng(e.target.value)} />
        </CardContent>
      </Card>

      {/* IMAGE */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Image</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload
            onSuccess={(url, meta) => {
              setImage(url);
              setImageFileId(meta?.fileId || "");
            }}
          />
          {image && (
            <img
              src={image}
              className="rounded-xl mt-4 max-h-64 object-cover border"
            />
          )}
        </CardContent>
      </Card>

      {/* DESCRIPTION */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* HISTORY */}
      <Card>
        <CardHeader>
          <CardTitle>History & Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={6}
            value={history}
            onChange={(e) => setHistory(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* IMPORTANT TIPS */}
      <Card>
        <CardHeader>
          <CardTitle>Important Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {importantTips.map((tip, i) => (
            <div key={i} className="flex gap-2">
              <Input value={tip} onChange={(e) => updateTip(i, e.target.value)} />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeTip(i)}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={addTip}>
            + Add Tip
          </Button>
        </CardContent>
      </Card>

      {/* TIMINGS */}
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Temple Timings</CardTitle>
          <Button size="sm" variant="outline" onClick={addSeason}>
            + Add Season
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {timings.map((season, i) => (
            <Card key={i} className="border-l-4 border-primary">
              <CardHeader className="flex justify-between">
                <CardTitle>{season.season}</CardTitle>
                <Button size="icon" variant="ghost" onClick={() => removeSeason(i)}>
                  <Trash2 size={16} />
                </Button>
              </CardHeader>

              <CardContent className="space-y-3">
                <Input
                  value={season.season}
                  onChange={(e) =>
                    updateSeasonField(i, "season", e.target.value)
                  }
                />
                <Input
                  value={season.validFrom}
                  onChange={(e) =>
                    updateSeasonField(i, "validFrom", e.target.value)
                  }
                />

                {season.rows.map((row, j) => (
                  <div key={j} className="flex gap-2">
                    <Input
                      value={row}
                      onChange={(e) => updateRow(i, j, e.target.value)}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeRow(i, j)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}

                <Button size="sm" variant="outline" onClick={() => addRow(i)}>
                  + Add Timing Row
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* HOW TO REACH */}
      <Card>
        <CardHeader>
          <CardTitle>How to Reach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={howToReach.byRoad}
            onChange={(e) =>
              setHowToReach((p:any) => ({ ...p, byRoad: e.target.value }))
            }
            placeholder="By Road"
          />
          <Textarea
            value={howToReach.byRail}
            onChange={(e) =>
              setHowToReach((p:any) => ({ ...p, byRail: e.target.value }))
            }
            placeholder="By Rail"
          />
          <Textarea
            value={howToReach.byAir}
            onChange={(e) =>
              setHowToReach((p:any) => ({ ...p, byAir: e.target.value }))
            }
            placeholder="By Air"
          />
          <Textarea
            value={howToReach.localTransport}
            onChange={(e) =>
              setHowToReach((p:any) => ({
                ...p,
                localTransport: e.target.value,
              }))
            }
            placeholder="Local Transport"
          />
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => updatePlace("draft")}>
          Save Draft
        </Button>
        <Button onClick={() => updatePlace("published")}>
          Update & Publish
        </Button>
      </div>
    </main>
  );
}
