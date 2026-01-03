// components/menu/Extras.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Extra } from "@/generated/prisma/client";
import { formatCurrency } from "@/lib/formatters";

export default function Extras({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      const filteredSelectedExtras = selectedExtras.filter(
        (item) => item.id !== extra.id
      );
      setSelectedExtras(filteredSelectedExtras);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };
  return (
    <div className="space-y-2">
      {extras.map((extra) => (
        <Label
          key={extra.id}
          className="flex justify-between p-3 border rounded-lg cursor-pointer hover:border-orange-400"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              onClick={() => handleExtra(extra)}
              checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
              id={extra.id}
            />
            {extra.name}
          </div>
          <span className="text-orange-600">
            + {formatCurrency(extra.price)}
          </span>
        </Label>
      ))}
    </div>
  );
}
