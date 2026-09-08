import { useState, useEffect } from "react";

function Filtrado() {
    const [tipos, setTipos] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");
    const [pokemones, setPokemones] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [orden, setOrden] = useState("ninguno");

    useEffect(() => {
        const obtenerTipos = async () => {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/type");
                const datos = await res.json();
                setTipos(datos.results.slice(0, 18));
            } catch (error) {
                console.error("Error al obtener los tipos:", error);
            }
        };
        obtenerTipos();
    }, []);

    useEffect(() => {
        const obtenerPokemonesPorTipo = async () => {
            setCargando(true);
            try {
                let lista = [];

                if (tipoSeleccionado === "todos") {
                    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
                    const datos = await res.json();
                    lista = datos.results;
                } else {
                    const res = await fetch(`https://pokeapi.co/api/v2/type/${tipoSeleccionado}`);
                    const datos = await res.json();
                    lista = datos.pokemon.slice(0, 20).map((item) => item.pokemon);
                }

                const detalles = await Promise.all(
                    lista.map(async (poke) => {
                        const res = await fetch(poke.url);
                        return await res.json();
                    })
                );

                setPokemones(detalles);
            } catch (error) {
                console.error("Error al obtener los Pokémon:", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerPokemonesPorTipo();
    }, [tipoSeleccionado]);

    const pokemonesProcesados = [...pokemones].sort((a, b) => {
        if (orden === "alfabetico") {
            return a.name.localeCompare(b.name);
        }
        if (orden === "peso-asc") {
            return a.weight - b.weight;
        }
        if (orden === "peso-desc") {
            return b.weight - a.weight;
        }
        if (orden === "altura-asc") {
            return a.height - b.height;
        }
        if (orden === "altura-desc") {
            return b.height - a.height;
        }
        return 0;
    });

    return (
        <section className="listaPokemones">
            <h2>Lista de Pokémon</h2>

            <div>
                <select
                    value={tipoSeleccionado}
                    onChange={(e) => setTipoSeleccionado(e.target.value)}
                >
                    <option value="todos">Todos los tipos</option>
                    {tipos.map((tipo) => (
                        <option key={tipo.name} value={tipo.name}>
                            {tipo.name}
                        </option>
                    ))}
                </select>

                <select
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                >
                    <option value="ninguno">Sin orden</option>
                    <option value="alfabetico">Orden alfabético (A-Z)</option>
                    <option value="peso-asc">Peso: Menor a Mayor</option>
                    <option value="peso-desc">Peso: Mayor a Menor</option>
                    <option value="altura-asc">Altura: Menor a Mayor</option>
                    <option value="altura-desc">Altura: Mayor a Menor</option>
                </select>
            </div>

            {cargando ? (
                <p>Cargando Pokémon...</p>
            ) : pokemonesProcesados.length === 0 ? (
                <p>No se encontraron Pokémon.</p>
            ) : (
                pokemonesProcesados.map((p) => (
                    <article key={p.id}>
                        <h3>{p.name}</h3>
                        <img src={p.sprites.front_default} alt={p.name} />
                        <p>Altura: {p.height}</p>
                        <p>Peso: {p.weight}</p>
                    </article>
                ))
            )}
        </section>
    );
}

export default Filtrado;