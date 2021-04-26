import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PokeLogo from "../images/Pokemon-Logo.png";
import { typeIcons } from "./Assets";
import { typeColors } from "./Assets";
import "../stylesheets/layout/PokeInfo.scss";
import { fetchService, urlPokeInfo } from "../services/fetchService";

const PokeInfo = () => {
    const [pokeInfo, setPokeInfo] = useState();
    const [pokeAbilitie, setPokeAbilitie] = useState();
    const [abilitieFilterEs, setAbilitieFilterEs] = useState();
    const [showAbilitieText, setShowAbilitieText] = useState("red");
    let { id } = useParams();
    let getAbilities;
    let getTypes;

    useEffect(() => {
        const fetchData = () => {
            fetchService(urlPokeInfo + id)
                .then(data =>
                    setPokeInfo(data));
        };
        fetchData();
    }, []);

    //Llamamos al filterAbilitie cuando nos aseguramos que el state pokeAbilitie ha seteado un valor
    useEffect(() => {
        filterAbilitie()
    }, [pokeAbilitie])

    const getMorePokeInfo = function () {
        //Abilities
        const mapAbilities = pokeInfo.abilities.map(i => i.ability);
        getAbilities = mapAbilities.map(i => i.name);
        //Types
        const mapTypes = pokeInfo.types.map(i => i.type);
        getTypes = mapTypes.map(i => i.name);

        //Stats
        // let jeje

        // for (let i of pokeInfo.stats) {
        //     jeje = {
        //         base: i.base_stat,
        //         effort: i.effort,
        //         //name: toli.name
        //     };

        // }
    }

    if (pokeInfo !== undefined) {
        getMorePokeInfo()
    }

    const showAbilitie = (e) => {
        const value = e.currentTarget.value;
        const abilities = pokeInfo.abilities.map(i => i.ability)
        const filter = abilities.filter(i => i.name === value)
        const abilitieUrl = filter.map(i => i.url);
        fetchInfoAbilitie(abilitieUrl)
        setShowAbilitieText(`${value}`);

    }

    const fetchInfoAbilitie = (abilitieUrl) => {
        fetchService(abilitieUrl)
            .then(data =>
                setPokeAbilitie(data))
    }

    const filterAbilitie = () => {
        if (typeof pokeAbilitie != "undefined") {
            const filterAbilitiesText = pokeAbilitie.flavor_text_entries.filter(i => i.language.name === "es")
            const getAbilitiesTextEs = filterAbilitiesText.map(i => i.flavor_text)
            const saveAbilitiesEs = getAbilitiesTextEs[getAbilitiesTextEs.length - 1]
            setAbilitieFilterEs(saveAbilitiesEs)
        }
    }

    return (
        <div className="poke">
            <div className="poke__back">
                <Link className="poke__back-link" to="/">Go Back</Link>
                <img className="poke__logo" src={PokeLogo} alt="logo pokemon" />
            </div>
            {pokeInfo !== undefined ? (
                <div className="poke__wrap">
                    <div className="poke__card" style={{ background: `linear-gradient(${typeColors[getTypes[0]]}, white)` }}>
                        <div className="poke__header">
                            <h3 className="poke__header-title">{pokeInfo.name.toUpperCase()}</h3>
                            {/* <h4>Type: </h4> */}
                            <ul className="poke__types">
                                {getTypes.map((i, indx) => {
                                    return (
                                        <li className="poke__types-item" key={indx}>
                                            <img className="poke__types-icon" src={typeIcons[i]} alt="icon type" /></li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="poke__main">
                            {pokeInfo.sprites.other.dream_world.front_default !== null ?
                                <img className="poke__main-img" src={pokeInfo.sprites.other.dream_world.front_default} alt="dream world" />
                                : ""}
                            {pokeInfo.sprites.other.dream_world.front_female !== null ?
                                <img className="poke__main-img" src={pokeInfo.sprites.other.dream_world.front_female} alt="dream world female" />
                                : ""}
                            <div className="poke__main-info">
                                <p>Height: {pokeInfo.height}|</p>
                                <p>Weight: {pokeInfo.weight}|</p>
                                <p>Base Experience: {pokeInfo.base_experience}|</p>
                            </div>
                        </div>
                        {/* {pokeInfo.sprites.other.official-artwork.front_default !== null ?
                        <img src={pokeInfo.sprites.other.official-artwork.front_default} alt="official" />
                        : "" } */}
                        <ol className="poke__abilities">
                            {/* <h4 className="poke__title">Abilities:</h4> */}
                            <p>{abilitieFilterEs}</p>
                            {getAbilities.map((i, index) => {
                                return (
                                    <li className="poke__abilities-item" key={index}>
                                        <button className="poke__abilities-btn" onMouseOver={showAbilitie} value={i}>
                                           {i} 
                                        </button></li>
                                )
                            })}
                            
                        </ol>
                        <div className="poke__preview">
                            {pokeInfo.sprites.front_default !== null ? (
                                <img className="poke__preview-img" src={pokeInfo.sprites.front_default} />
                            ) : ""}
                            {pokeInfo.sprites.back_default !== null ? (
                                <img className="poke__preview-img" src={pokeInfo.sprites.back_default} />
                            ) : ""}
                            <p className="poke__preview-id">ID: {id}</p>
                        </div>
                    </div>

                    {/* {pokeInfo.stats.map((i, index) => {
                                return (
                                    <div>
                                    <li> 
                                        <p>Base Stat {i.base_stat}</p>
                                        <p>Effort {i.effort}</p>
                                      
                                    </li>
                                    </div>
                                )
                        })} */}
                    {/* style={{ backgroundImage: `url(${pokeInfo.sprites.front_default})` */}
                </div>
            ) : ("")}
            {/* IS POKEMON! A CACHU POWEEERRRR */}
        </div>
    )
}

export default PokeInfo

