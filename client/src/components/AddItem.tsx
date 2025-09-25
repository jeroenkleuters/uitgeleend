// client/src/components/AddItem.tsx
import { useState } from "react";
import { createItem } from "../api/api";
import UserSelect from "./UserSelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/StarRating";

export default function AddItem({
  onItemAdded,
}: {
  onItemAdded?: () => Promise<void> | void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [popupPhoto, setPopupPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("");
    setRating(0);
    setSelectedUser(null);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !type) {
      alert("Titel en type zijn verplicht.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Maak item aan zonder foto
      const item = await createItem({
        title,
        description,
        type,
        rating,
        borrowedBy: selectedUser ?? null,
      });

      // 2️⃣ Upload foto als die geselecteerd is
      if (photoFile) {
        const formData = new FormData();
        formData.append("photo", photoFile);

        await fetch(`${import.meta.env.VITE_API_URL}/items/${item._id}/photo`, {
          method: "POST",
          body: formData,
        });
      }

      if (onItemAdded) await onItemAdded();
      resetForm();
    } catch (err) {
      console.error("Fout bij maken item:", err);
      alert("Er ging iets mis bij het toevoegen van het item. Kijk de console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4 p-4 bg-card rounded">
      <h3 className="text-lg font-semibold">Nieuw item</h3>

      {/* Foto preview rechtsboven */}
      {photoPreview && (
        <img
          src={photoPreview}
          alt="Preview"
          className="absolute top-2 right-2 w-[150px] h-[150px] object-cover border rounded shadow cursor-pointer"
          onClick={() => setPopupPhoto(photoPreview)}
        />
      )}

      {popupPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={popupPhoto}
              alt="Grote weergave"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
            <Button
              className="absolute top-2 right-2"
              variant="destructive"
              onClick={() => setPopupPhoto(null)}
            >
              Sluiten
            </Button>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Titel</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bijv. Boormachine"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Beschrijving</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded resize-y"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <span>Rating:</span>
        <StarRating
          initialValue={rating}
          onChange={(val) => setRating(val)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">-- Kies type --</option>
          <option value="boek">Boek</option>
          <option value="lp">LP</option>
          <option value="cd">CD</option>
          <option value="dvd">DVD</option>
          <option value="kledingstuk">Kledingstuk</option>
          <option value="spel">Spel</option>
          <option value="gereedschap">Gereedschap</option>
          <option value="anders">Anders</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Uitgeleend aan</label>
        <UserSelect
          value={selectedUser}
          onChange={(id) => setSelectedUser(id)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setPhotoFile(file);
            if (file) {
              setPhotoPreview(URL.createObjectURL(file));
            } else {
              setPhotoPreview(null);
            }
          }}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="destructive" disabled={loading}>
          {loading ? "Bezig..." : "Toevoegen"}
        </Button>
      </div>
    </form>
  );
}
