import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="
        rounded-xl
        border
        p-6
        hover:shadow-lg
        transition
        block
      "
    >
      <h3 className="text-lg font-semibold">
        {category.name}
      </h3>
    </Link>
  );
}

export default CategoryCard;