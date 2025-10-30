import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";
import BookModal from "../components/BookModal"; // new modal
import { fetchBooks } from "../services/openLibraryApi";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");
  const [visibleCount, setVisibleCount] = useState(12);
  const [language, setLanguage] = useState("all");
  const [savedBooks, setSavedBooks] = useState([]);
  const [activeView, setActiveView] = useState("search"); // "search" | "saved"
  const [selectedBook, setSelectedBook] = useState(null); // for modal

  const handleSearch = async (query, type) => {
    setLoading(true);
    const results = await fetchBooks(query, type);
    setBooks(results);
    setVisibleCount(12);
    setActiveView("search");
    setLoading(false);
  };

  const clearFilters = () => {
    setSortOrder("none");
    setVisibleCount(12);
    setLanguage("all");
  };

  const toggleSaveBook = (book) => {
    if (savedBooks.some((b) => b.key === book.key)) {
      setSavedBooks(savedBooks.filter((b) => b.key !== book.key));
    } else {
      setSavedBooks([...savedBooks, book]);
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (sortOrder === "asc") return (a.first_publish_year || 0) - (b.first_publish_year || 0);
    if (sortOrder === "desc") return (b.first_publish_year || 0) - (a.first_publish_year || 0);
    return 0;
  });

  const filteredBooks =
    language === "all"
      ? sortedBooks
      : sortedBooks.filter((book) =>
          book.language?.some((lang) => lang.toLowerCase() === language.toLowerCase())
        );

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  return (
    <div>
      {/* Top bar with Search and Saved toggle */}
      <div className="flex justify-between items-center mb-6">
        <SearchBar onSearch={handleSearch} />
        <button
          onClick={() => setActiveView(activeView === "search" ? "saved" : "search")}
          className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          {activeView === "search" ? "⭐ View Saved" : "🔍 Back to Search"}
        </button>
      </div>

      {/* Filters only in Search View */}
      {activeView === "search" && books.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
          <p className="text-gray-600">
            Showing {visibleBooks.length} of {filteredBooks.length} results
          </p>

          <div className="flex gap-2 flex-wrap">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="none">Sort by Year</option>
              <option value="asc">Oldest → Newest</option>
              <option value="desc">Newest → Oldest</option>
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 border rounded-lg"
            >
              {/* hhhh  */}
              <option value="all">All Languages</option>
              <option value="eng">English</option>
              {/* <option value="hin">Hindi</option> */}
              <option value="spa">Spanish</option>
              <option value="fre">French</option>
              <option value="ger">German</option>
              <option value="ita">Italian</option>
              <option value="jpn">Japanese</option>
              <option value="chi">Chinese</option>
            </select>

            <button
              onClick={clearFilters}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Search View */}
      {activeView === "search" && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {visibleBooks.length > 0 ? (
                  visibleBooks.map((book) => (
                    <BookCard
                      key={book.key}
                      book={book}
                      isSaved={savedBooks.some((b) => b.key === book.key)}
                      onToggleSave={toggleSaveBook}
                      onSelect={() => setSelectedBook(book)} // open modal
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-600">No books found. Try searching!</p>
                )}
              </div>

              {visibleBooks.length < filteredBooks.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Saved View */}
      {activeView === "saved" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">⭐ Saved Books</h2>
          {savedBooks.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {savedBooks.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  isSaved={true}
                  onToggleSave={toggleSaveBook}
                  onSelect={() => setSelectedBook(book)} // open modal
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No saved books yet.</p>
          )}
        </div>
      )}

      {/* Modal for book details */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          isSaved={savedBooks.some((b) => b.key === selectedBook.key)}
          onToggleSave={toggleSaveBook}
        />
      )}
    </div>
  );
}
