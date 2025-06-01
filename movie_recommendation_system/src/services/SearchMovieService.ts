export async function SearchMovies(query: string) {
    const response = await fetch(`http://localhost:8000/utils/movies/search?query=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Movie search failed");

    return response.json();
}