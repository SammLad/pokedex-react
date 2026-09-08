import { useState } from "react";
import Pokedex from "./pages/Pokedex";
import MiEquipo from "./pages/MiEquipo";
import Filtrado from "./pages/filtrado";
import "./styles.css";

function App() {
  const [actualizarEquipo, setActualizarEquipo] =
    useState(0);

  return (
    <main>

      <h1>Pokédex React</h1>
      <hr />
      <Filtrado />
      <hr />

      <Pokedex
        onPokemonAgregado={() =>
          setActualizarEquipo(
            valor => valor + 1
          )
        }
      />

      <hr />

      <MiEquipo
        actualizarEquipo={actualizarEquipo}
      />
    </main>
  );
}

export default App;