export default function BookModal({ book, onClose, isSaved, onToggleSave }) {
  const coverImage = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        <div className="flex flex-col items-center">
          <img
            src={coverImage}
            alt={book.title}
            className="w-40 h-60 object-cover rounded mb-4"
          />

          <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-700 mb-1">
            <strong>Author(s):</strong>{" "}
            {book.author_name ? book.author_name.join(", ") : "Unknown"}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>First Published:</strong> {book.first_publish_year || "N/A"}
          </p>
          {book.language && (
            <p className="text-gray-700 mb-1">
              <strong>Languages:</strong> {book.language.join(", ")}
            </p>
          )}
          {book.subject && (
            <p className="text-gray-700 text-sm mt-2">
              <strong>Subjects:</strong> {book.subject.slice(0, 5).join(", ")}...
            </p>
          )}

          <button
            onClick={() => onToggleSave(book)}
            className={`mt-4 px-4 py-2 rounded-lg ${
              isSaved ? "bg-red-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {isSaved ? "★ Remove from Saved" : "☆ Save to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
