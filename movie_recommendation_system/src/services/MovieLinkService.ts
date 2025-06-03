// Fetches the movie link for a specific room by roomId
export async function getMovieLink(roomId: string) {
    const response = await fetch(`http://localhost:8000/movies/link/${roomId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.detail);
    }

    return responseData; // Should contain the movie link
}

export async function getMovieURLById(movieId: number) {
    const response = await fetch(`http://localhost:8000/movies/watch/${movieId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.detail);
    }

    console.log("Movie URL fetched:", responseData);
    return responseData;
}