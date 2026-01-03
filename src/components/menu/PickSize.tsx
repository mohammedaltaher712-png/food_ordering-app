// components/menu/PickSize.tsx
"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Size } from "@/generated/prisma/client";
import { formatCurrency } from "@/lib/formatters";

export default function PickSize({
  sizes,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  selectedSize: Size;
  setSelectedSize: (size: Size) => void;
}) {
  return (
    <RadioGroup value={selectedSize.name} onValueChange={(name) => {
      const size = sizes.find(s => s.name === name);
      if (size) setSelectedSize(size);
    }} className="space-y-3">
      {sizes.map((size) => (
        <Label key={size.id} className={`flex justify-between p-3 border rounded-lg cursor-pointer ${selectedSize.id === size.id ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value={size.name} />
            {size.name}
          </div>
          <span className="text-orange-600">{formatCurrency(size.price)}</span>
        </Label>
      ))}
    </RadioGroup>
  );
}
