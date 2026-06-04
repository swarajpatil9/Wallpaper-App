import CategoryGrid from "../../features/categories/components/CategoryGrid";
import { useCategories } from "../../features/categories/hooks/useCategories";

function CategoriesPage() {
  const { categories } = useCategories();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        Categories
      </h1>

      <CategoryGrid categories={categories} />
    </div>
  );
}

export default CategoriesPage;