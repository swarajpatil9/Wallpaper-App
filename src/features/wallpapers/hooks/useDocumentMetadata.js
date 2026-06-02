import { useEffect } from "react";

function upsertMeta(selector, createElement) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = createElement();
    document.head.appendChild(element);
  }

  return element;
}

function setMetaContent({ selector, attribute, key, content }) {
  if (!content) {
    return;
  }

  const element = upsertMeta(selector, () => {
    const meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    return meta;
  });

  element.setAttribute("content", content);
}

function setCanonical(href) {
  if (!href) {
    return;
  }

  const canonical = upsertMeta('link[rel="canonical"]', () => {
    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    return link;
  });

  canonical.setAttribute("href", href);
}

function buildAbsoluteUrl(pathname = "/") {
  if (typeof window === "undefined") {
    return pathname;
  }

  return new URL(pathname, window.location.origin).toString();
}

function useDocumentMetadata({
  title,
  description,
  image,
  pathname,
  robots = "index,follow",
  type = "website",
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const absoluteUrl = buildAbsoluteUrl(pathname || window.location.pathname);

    setMetaContent({
      selector: 'meta[name="description"]',
      attribute: "name",
      key: "description",
      content: description,
    });
    setMetaContent({
      selector: 'meta[name="robots"]',
      attribute: "name",
      key: "robots",
      content: robots,
    });
    setMetaContent({
      selector: 'meta[property="og:title"]',
      attribute: "property",
      key: "og:title",
      content: title,
    });
    setMetaContent({
      selector: 'meta[property="og:description"]',
      attribute: "property",
      key: "og:description",
      content: description,
    });
    setMetaContent({
      selector: 'meta[property="og:type"]',
      attribute: "property",
      key: "og:type",
      content: type,
    });
    setMetaContent({
      selector: 'meta[property="og:url"]',
      attribute: "property",
      key: "og:url",
      content: absoluteUrl,
    });
    setMetaContent({
      selector: 'meta[name="twitter:card"]',
      attribute: "name",
      key: "twitter:card",
      content: image ? "summary_large_image" : "summary",
    });
    setMetaContent({
      selector: 'meta[name="twitter:title"]',
      attribute: "name",
      key: "twitter:title",
      content: title,
    });
    setMetaContent({
      selector: 'meta[name="twitter:description"]',
      attribute: "name",
      key: "twitter:description",
      content: description,
    });

    if (image) {
      setMetaContent({
        selector: 'meta[property="og:image"]',
        attribute: "property",
        key: "og:image",
        content: image,
      });
      setMetaContent({
        selector: 'meta[name="twitter:image"]',
        attribute: "name",
        key: "twitter:image",
        content: image,
      });
    }

    setCanonical(absoluteUrl);
  }, [description, image, pathname, robots, title, type]);
}

export default useDocumentMetadata;
