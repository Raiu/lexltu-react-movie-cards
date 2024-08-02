import {
    createContext,
    Dispatch,
    ReactElement,
    useContext,
    useReducer,
} from "react";
import {
    IMovie,
    IMoviesAction,
    IMoviesProviderProps,
    TMoviesAction,
} from "@interfaces";
import { movies as initialMovies } from "@data";

const MoviesContext = createContext<IMovie[] | null>(null);

const MoviesDispatchContext = createContext<Dispatch<IMoviesAction> | null>(
    null
);

export function Movies({ children }: IMoviesProviderProps): ReactElement {
    const [movies, action] = useReducer(moviesReducer, initialMovies);

    return (
        <MoviesContext.Provider value={movies}>
            <MoviesDispatchContext.Provider value={action}>
                {children}
            </MoviesDispatchContext.Provider>
        </MoviesContext.Provider>
    );
}

export function moviesReducer(
    movies: IMovie[],
    action: TMoviesAction
): IMovie[] {
    switch (action.type) {
        case "CREATE":
            if ("movie" in action) {
                return [...movies, createMovie(action.movie, movies)];
            }
            break;

        default:
            return movies;
    }
    return movies;
}

export function useMovies(): IMovie[] | null {
    return useContext(MoviesContext);
}

export function useMoviesDispatch(): Dispatch<IMoviesAction> | null {
    return useContext(MoviesDispatchContext);
}

function createMovie(movie: IMovie, movies: IMovie[]): IMovie {
    const maxId = movies
        ? movies.reduce((maxId, movie) => {
            return movie.id && movie.id > maxId ? movie.id : maxId;
        }, 0)
        : 0;

    return {
        id: maxId + 1,
        title: movie.title,
        rating: movie.rating,
        genre: movie.genre,
        description: movie.description,
    };
}
