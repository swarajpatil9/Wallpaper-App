import CategoryCard from "./CategoryCard";

function CategoryGrid({ categories }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
      "
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}

export default CategoryGrid;