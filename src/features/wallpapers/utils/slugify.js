export function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function parseWallpaperId(rawValue = "") {
  const [id] = String(rawValue).split("-");
  const parsedId = Number(id);

  return Number.isFinite(parsedId) ? parsedId : null;
}
