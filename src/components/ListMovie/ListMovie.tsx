import { ReactElement } from "react";
import { IMovie } from "@interfaces";
import { MovieCard } from "@components";

import { useMovies } from "@components/Movies";

export function ListMovies(): ReactElement {
    const movies: IMovie[] | null = useMovies();
    return (
        <div className="movies-list flex gap-4 px-4 flex-wrap justify-center my-4">
            {movies && [...movies].reverse().map((movie) => (<MovieCard key={movie.id} movie={movie} />))}
        </div>
    )
}
