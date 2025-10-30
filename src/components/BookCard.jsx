export default function BookCard({ book, isSaved, onToggleSave, onSelect }) {
  const coverImage = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center">
      <img
        src={coverImage}
        alt={book.title}
        className="w-32 h-44 object-cover rounded mb-3 cursor-pointer"
        onClick={onSelect}
      />

      <h3
        className="font-bold text-lg text-center cursor-pointer hover:underline"
        onClick={onSelect}
      >
        {book.title}
      </h3>
      <p className="text-sm text-gray-600 text-center">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>

      <button
        onClick={() => onToggleSave(book)}
        className={`mt-3 px-3 py-1 rounded-lg ${
          isSaved ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        }`}
      >
        {isSaved ? "★ Remove" : "☆ Save"}
      </button>
    </div>
  );
}
