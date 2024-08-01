import { ReactElement } from "react";
import { IMovie } from "@interfaces";

import { StarRate as StarRateIcon } from '@mui/icons-material';
import "./index.css";


interface IProp {
    movie: IMovie
}

export function MovieCard({ movie }: IProp): ReactElement {
    return (
        <article className="card">
            <figure className="label">
                <img src={`https://placehold.co/600x400`} alt={movie.title} />

            </figure>
            <div className="p-4">
                <div className="flex">
                    <div>
                        <h3 className="title">{movie.title}</h3>
                    </div>
                    <div className="flex last-item-right">
                        <StarRateIcon />
                        <span className="rating">{movie.rating}</span>
                    </div>
                </div>
                <p className="genre">{movie.genre}</p>
                <p className="description">{movie.description}</p>
            </div>
        </article>
    )
}