export async function getMovieDetail(movieId: number) {
    const response = await fetch(`http://localhost:8000/movies/${movieId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.detail);
    }

    return responseData;
}