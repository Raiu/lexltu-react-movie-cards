export interface IMovie {
    id?: number
    title: string
    rating: number
    genre: string
    description: string
}

export interface IMoviesAction {
    type: string
    id?: number
    movie?: IMovie
}

export interface IMoviesProviderProps {
    children: React.ReactNode
}

export interface ICreateMovieAction {
    type: "CREATE"
    movie: IMovie
}

export interface IOtherMoviesAction {
    type: string
}

export type TMoviesAction = ICreateMovieAction | IOtherMoviesAction


export type TMovies = IMovie[] | null