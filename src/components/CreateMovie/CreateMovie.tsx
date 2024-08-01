import {
    ChangeEvent,
    /* MouseEvent, */
    ReactElement,
    useState,
    useRef,
    useEffect,
    FormEvent,
} from "react";
import { IMovie } from "@/interfaces";
import { useMoviesDispatch } from "@components/Movies";

/* import { Fab, Zoom } from "@mui/material"; */
import { Add as AddIcon, RestartAlt as RestartAltIcon } from "@mui/icons-material";

import { genres as genresData } from "@data";

import "./index.css";

type TChangeEventElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function CreateMovie(): ReactElement {
    const dispatch = useMoviesDispatch()!;

    const collapseRef = useRef<HTMLFormElement>(null);

    const [isFormExpanded, setFormExpanded] = useState(false);

    const expandForm = () => setFormExpanded(true);
    const collapseForm = () => setFormExpanded(false);

    const [movie, setMovie] = useState<IMovie>({
        title: "",
        description: "",
        genre: "",
        rating: 0,
    });

    const handleChange = (e: ChangeEvent<TChangeEventElements>) => {
        const { name, value } = e.currentTarget;
        setMovie((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleReset = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMovie({
            title: "",
            description: "",
            genre: "",
            rating: 0,
        });
        collapseForm();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type: "CREATE",
            movie,
        });
        setMovie({
            title: "",
            description: "",
            genre: "",
            rating: 0,
        });
        collapseForm();
    };

    useOnClickOutside(collapseRef, collapseForm);

    return (
        <div className="flex justify-center">
            <form ref={collapseRef} className="create-movie" onClick={expandForm} onReset={handleReset} onSubmit={handleSubmit}>
                <input
                    name="title"
                    onChange={handleChange}
                    value={movie.title}
                    placeholder="Movie title..."
                />

                {isFormExpanded && (
                    <>
                        <select name="genre" onChange={handleChange}>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                        <input name="rating" type="range" min="1" max="5" step="0.5" onChange={handleChange} />
                        <textarea
                            name="description"
                            onChange={handleChange}
                            value={movie.description}
                            placeholder="Movie description..."
                            rows={isFormExpanded ? 4 : 1}
                        />

                        <div className="btn-group flex gap-2">
                            <button className="btn reset" type="reset"><RestartAltIcon /></button>
                            <button className="btn add" type="submit"><AddIcon /></button>
                        </div>
                    </>

                )}
            </form>
        </div>
    );
}

function useOnClickOutside(
    ref: React.RefObject<HTMLElement>,
    handler: (event: UIEvent) => void
) {
    useEffect(() => {
        const listener = (event: UIEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
