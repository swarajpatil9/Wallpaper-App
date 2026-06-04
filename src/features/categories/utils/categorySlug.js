export const getCategoryBySlug = (
  categories,
  slug
) => {
  return categories.find(
    (category) => category.slug === slug
  );
};