import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Place from "@/models/Place";
import EditPlaceForm from "./EditPlaceForm";

async function getPlace(id: string) {
  await connectToDatabase();
  return Place.findById(id).lean();
}

export default async function EditPlacePage({
  params,
}: {
  params: { slug: string };
}) {
    const {slug}= await params
  const place = await getPlace(slug);

  if (!place) notFound();

  return (
    <main className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-serif font-bold mb-6">
        Edit Place – Braj Darshan
      </h1>

      <EditPlaceForm place={JSON.parse(JSON.stringify(place))} />
    </main>
  );
}
