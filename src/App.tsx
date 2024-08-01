import { Header, Movies, CreateMovie, ListMovies } from "@components";

export function App() {
  return (
    <>
      <Header />
      <Movies>
        <CreateMovie />
        <ListMovies />
      </Movies>
    </>
  );
}
