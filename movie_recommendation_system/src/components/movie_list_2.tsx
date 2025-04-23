import {IMovieList2 } from '../types/i_movie_list_2.ts';

export default function MovieList2() {
    const URL = 'https://image.tmdb.org/t/p/original';
    const posters: IMovieList2[] = [
        {
            id: 27205,
            title: 'Inception',
            description: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his target...',
            poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
        },
        {
            id: 157336,
            title: 'Interstellar',
            description: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the li...',
            poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        },
        {
            id: 155,
            title: 'The Dark Knight',
            description: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney ...',
            poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        },
        {
            id: 19995,
            title: 'Avatar',
            description: 'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but ...',
            poster_path: '/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
        },
        {
            id: 24428,
            title: 'The Avengers',
            description: 'When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of th...',
            poster_path: '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
        },
    ];

    const postersProcess = posters.map((poster) => ({
        ...poster,
        poster_path: `${URL}${poster.poster_path}`,
    }));

    return (
        <div
            className="mt-8 mb-8 ml-16 mr-16
                    grid grid-cols-5 gap-12
                    bg-black">
            {postersProcess.map((poster) => (
                <div key={poster.id} className="item-center justify-center">
                    <img
                        src={poster.poster_path}
                        alt={poster.title}
                        className="rounded-3xl w-[20rem] h-[30rem]
                        hover:scale-110 transition-all duration-300"
                    />
                </div>
            ))}
        </div>
    );
}
