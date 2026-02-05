"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FileUpload from "@/components/FileUpload";
import type { PlaceTimings } from "@/types/place";
import { useToast } from "@/components/ui/toast-provider";

type PlaceType = "Temple" | "Ghat" | "Forest" | "Pilgrimage";
type Status = "draft" | "published";

export default function AddPlacePage() {

  const toast= useToast()

  /* ---------------- BASIC ---------------- */
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<PlaceType>("Temple");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState("");
  const [imageFileId, setImageFileId] = useState("");
  
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState<Status>("draft");

  /* ---------------- TIMINGS ---------------- */
  const [timings, setTimings] = useState<PlaceTimings>([]);

  const [history, setHistory] = useState("");
  const [howToReach, setHowToReach] = useState({
    byRoad: "",
    byRail: "",
    byAir: "",
    localTransport: "",
  });
  const [importantTips, setImportantTips] = useState<string[]>([
    "Best time to visit is early morning Mangala Aarti.",
  ]);



  // post handler 
const submitPlace = async (finalStatus: Status) => {
  try {
    const res = await fetch("/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
        title: "Failed to save place",
        description: data.message || "Something went wrong",
      });
      return;
    }

    toast({
      title:
        finalStatus === "published"
          ? "Place published"
          : "Draft saved",
      description:
        finalStatus === "published"
          ? "This place is now live on Braj Darshan"
          : "You can publish it anytime later",
    });
  } catch (error) {
    console.error(error);

    toast({
      title: "Network error",
      description: "Unable to connect to server",
    });
  }
};



  const addTip = () => setImportantTips((t) => [...t, ""]);

  const updateTip = (index: number, value: string) => {
    setImportantTips((t) => t.map((tip, i) => (i === index ? value : tip)));
  };

  const removeTip = (index: number) => {
    setImportantTips((t) => t.filter((_, i) => i !== index));
  };

  const addSeason = () => {
    setTimings((prev) => [
      ...prev,
      {
        season: "Summer",
        validFrom: "Post-Holi",
        rows: [""],
      },
    ]);
  };

  const updateSeasonField = (
    i: number,
    key: "season" | "validFrom",
    value: string,
  ) => {
    const copy = [...timings];
    copy[i][key] = value;
    setTimings(copy);
  };

  const updateRow = (i: number, rowIndex: number, value: string) => {
    const copy = [...timings];
    copy[i].rows[rowIndex] = value;
    setTimings(copy);
  };

  const addRow = (i: number) => {
    const copy = [...timings];
    copy[i].rows.push("");
    setTimings(copy);
  };

  const removeRow = (i: number, rowIndex: number) => {
    const copy = [...timings];
    copy[i].rows.splice(rowIndex, 1);
    setTimings(copy);
  };

  const removeSeason = (i: number) => {
    setTimings((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* ---------------- UI ---------------- */
  return (
    <main className="max-w-5xl mx-auto py-10 space-y-10">
      <h1 className="text-3xl font-serif font-bold">
        Add New Place – Braj Darshan
      </h1>

     
        {/* BASIC DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder="Place Name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
            }}
          />
          <Input
            placeholder="Slug"
            value={slug}
            required
            onChange={(e) => setSlug(e.target.value)}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as PlaceType)}
            className="border rounded px-3 py-2"
            required
          >
            <option>Temple</option>
            <option>Ghat</option>
            <option>Forest</option>
            <option>Pilgrimage</option>
          </select>

          <Input
            placeholder="Location (Vrindavan / Mathura)"
            value={location}
            required
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
          <Input
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <Input
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* IMAGE */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload onSuccess={(url, meta)=>{
            setImage(url)
            setImageFileId(meta?.fileId || "");
          }} />
          {image && (
            <img
              src={image}
              className="rounded-xl max-h-64 object-cover border"
              alt="preview"
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
            placeholder="About this sacred place..."
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* TIMINGS */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Temple Timings</CardTitle>
          <Button size="sm" variant="outline" type="button" onClick={addSeason}>
            + Add Season
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {timings.map((season, i) => (
            <Card key={i} className="border-l-4 border-primary">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>
                  {season.season} Timings
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({season.validFrom})
                  </span>
                </CardTitle>
                <Button
                  size="icon"
                  variant="ghost"

                  onClick={() => removeSeason(i)}
                >
                  <Trash2 size={16} />
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Season (Summer / Winter)"
                    value={season.season}
                    onChange={(e) =>
                      updateSeasonField(i, "season", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Valid From (Post-Holi)"
                    value={season.validFrom}
                    onChange={(e) =>
                      updateSeasonField(i, "validFrom", e.target.value)
                    }
                  />
                </div>

                {/* TIMING ROWS */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Timings (one line per entry)
                  </p>

                  {season.rows.map((row, j) => (
                    <div key={j} className="flex gap-2">
                      <Input
                        placeholder="e.g. Shringar Aarti: 08:00 AM"
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
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      {/* IMPORTANT TIPS */}
      <Card>
        <CardHeader>
          <CardTitle>Important Tips for Visitors</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {importantTips.map((tip, i) => (
            <div key={i} className="flex gap-2 items-start">
              <Input
                placeholder={`Tip ${i + 1} (e.g. Avoid weekends due to crowd)`}
                value={tip}
                onChange={(e) => updateTip(i, e.target.value)}
              />

              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeTip(i)}
                className="text-muted-foreground hover:text-red-500"
              >
                ✕
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" size="sm" onClick={addTip}>
            + Add Tip
          </Button>

          <p className="text-xs text-muted-foreground">
            Tips appear as bullet points on the place detail page.
          </p>
        </CardContent>
      </Card>

      {/* HISTORY */}
      <Card>
        <CardHeader>
          <CardTitle>History & Legend</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Textarea
            rows={6}
            placeholder="Historical significance, legends, saints associated with this place..."
            value={history}
            onChange={(e) => setHistory(e.target.value)}
          />

          <p className="text-xs text-muted-foreground">
            Tip: Write in story format. This helps SEO & reader engagement.
          </p>
        </CardContent>
      </Card>
      {/* HOW TO REACH */}
      <Card>
        <CardHeader>
          <CardTitle>How to Reach</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Textarea
            rows={3}
            placeholder="By Road (distance from Mathura / Delhi etc.)"
            value={howToReach.byRoad}
            onChange={(e) =>
              setHowToReach((p) => ({ ...p, byRoad: e.target.value }))
            }
          />

          <Textarea
            rows={3}
            placeholder="By Rail (nearest railway station & distance)"
            value={howToReach.byRail}
            onChange={(e) =>
              setHowToReach((p) => ({ ...p, byRail: e.target.value }))
            }
          />

          <Textarea
            rows={3}
            placeholder="By Air (nearest airport & connectivity)"
            value={howToReach.byAir}
            onChange={(e) =>
              setHowToReach((p) => ({ ...p, byAir: e.target.value }))
            }
          />

          <Textarea
            rows={3}
            placeholder="Local Transport (e-rickshaw, auto, walking distance etc.)"
            value={howToReach.localTransport}
            onChange={(e) =>
              setHowToReach((p) => ({ ...p, localTransport: e.target.value }))
            }
          />
        </CardContent>
      </Card>


      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => submitPlace("draft")}>Save Draft</Button>
        <Button type="submit"  onClick={() => submitPlace("published")}>Publish Place</Button>
      </div>
      
    </main>
  );
}
