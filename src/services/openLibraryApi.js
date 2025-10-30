// src/services/openLibraryApi.js
export const fetchBooks = async (query, type = "title") => {
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?${type}=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    let results = data.docs;

    // Author filter (partial match)
    if (type === "author") {
      results = results.filter((book) =>
        book.author_name?.some((name) =>
          name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    // Title filter (partial match)
    if (type === "title") {
      results = results.filter((book) =>
        book.title?.toLowerCase().includes(query.toLowerCase())
      );
    }

    return results; // return all, no slice here
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
