"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Menu from "@/components/menu";
import type { Category } from "@/types/category";

interface MenuPageProps {
  categories: Category[];
}

export default function MenuPageClient({ categories }: MenuPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  return (
    <main className="p-4">
      <div className="flex gap-2 mb-4 flex-wrap items-center justify-center">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategoryId === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {selectedCategory ? (
        <Menu items={selectedCategory.products} />
      ) : (
        <p className="text-center text-gray-500">اختر قسمًا لعرض منتجاته</p>
      )}
    </main>
  );
}
