import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PokeLogo from "../images/Pokemon-Logo.png";
import { typeIcons } from "./Assets";
import { typeColors } from "./Assets";
import "../stylesheets/layout/PokeInfo.scss";
import { fetchService, urlPokeInfo } from "../services/fetchService";

const PokeInfo = () => {
    const [pokeInfo, setPokeInfo] = useState();
    const [pokeAbilitie, setPokeAbilitie] = useState([]);
    const [abilitieFilterEs, setAbilitieFilterEs] = useState();
    const [abilitieNameEs, setAbilitieNameEs] = useState();
    const [active, setActive] = useState("")
    let { id } = useParams();
    let getAbilities;
    let getTypes;
    let mapAbilities;
    let abilitieUrl;

    useEffect(() => {
        const fetchData = () => {
            fetchService(urlPokeInfo + id)
                .then(data =>
                    setPokeInfo(data));
        };
        fetchData();
    }, []);

    // //Llamamos al filterAbilitie cuando nos aseguramos que el state pokeAbilitie ha seteado un valor
    
    useEffect(() => {
        fetchInfoAbilitie(abilitieUrl)
    }, [pokeInfo])
    
    useEffect(() => {
        filterAbilitie()
    }, [pokeAbilitie], fetchInfoAbilitie)

    const getMorePokeInfo = function () {
        //Abilities
        mapAbilities = pokeInfo.abilities.map(i => i.ability);
        getAbilities = mapAbilities.map(i => i.name);
        abilitieUrl = mapAbilities.map(i => i.url);
        //Types
        const mapTypes = pokeInfo.types.map(i => i.type);
        getTypes = mapTypes.map(i => i.name);
    }

    if (pokeInfo !== undefined) {
        getMorePokeInfo()
    }

    var fetchInfoAbilitie = async(abilitieUrl) => {
        if (typeof abilitieUrl != "undefined") {
            for (let dataUrl of abilitieUrl) {
                await fetchService(dataUrl)
                .then(abilityData => {
                  setTimeout(setPokeAbilitie(prevAbility => {
                        return [
                            ... prevAbility,
                            abilityData
                        ]
                    }), 1000)
                })
            }
        } 
        //filterAbilitie()
    };

    const filterAbilitie = () => {
        //console.log("pokeAbilite filter in funciontx", pokeAbilitie)
        if (pokeAbilitie.length) {
         //  await mimimi()
        const filterAbilitiesText = pokeAbilitie[0].flavor_text_entries.filter(i => i.language.name === "es")
        const firstAbilitieText = filterAbilitiesText[filterAbilitiesText.length -1].flavor_text;
        setAbilitieFilterEs(firstAbilitieText);
        setActive(pokeAbilitie[0].name)
           // const filterAbilitiesText = pokeAbilitie.map(i => i.flavor_text_entries.filter(i => i.language.name === "es"))
            // const getAbilitiesTextEs = filterAbilitiesText.map(i => i.map(i => i.flavor_text))
           // console.log("getAbilitiesTextEs", getAbilitiesTextEs)

          //  const saveAbilitiesEs = getAbilitiesTextEs.map( i => i[i.length - 1])
           // console.log("saveAbilitiesEs", saveAbilitiesEs)

    //         setAbilitieFilterEs([saveAbilitiesEs])
        console.log("getAbilities", pokeAbilitie)
        const abilitieEs = pokeAbilitie[0].names.filter(i => i.language.name === "es")
        const saveAbilitieEs = abilitieEs.map(i => i.name);
        console.log("abilitieEs--->", saveAbilitieEs)
        setAbilitieNameEs(saveAbilitieEs);
        }
    }
    const mimimi = function() {
    }
    const showAbilitie = (e) => {
        console.log("pokeAbilite filter in value", pokeAbilitie)
        const value = e.currentTarget.value;
        const handleFilterAbilitie = pokeAbilitie.filter(i => i.name === value);
        const handleAbilitie = handleFilterAbilitie.map(i => i.flavor_text_entries.filter(i => i.language.name === "es"));
        const handleSelectAbilitie = handleAbilitie.map( i => i[i.length -1]);
        const handleSelectAbilitieText = handleSelectAbilitie.map(i => i.flavor_text);
        setAbilitieFilterEs(handleSelectAbilitieText);
        console.log("VALEU", value)
        console.log("handleFilterAbilitie", handleFilterAbilitie)
        console.log("handleAbilitie", handleAbilitie)
        console.log("handleSelectAbilitieText", handleSelectAbilitieText)
        // abilitieUrl = filter.map(i => i.url);
        // fetchInfoAbilitie(abilitieUrl)
        const abilitieEsEvent = handleFilterAbilitie.map(i => i.names.filter(i => i.language.name === "es"))
        const saveAbilitieEsEvent = abilitieEsEvent.map(i => i.map(i => i.name)).flat();
        setAbilitieNameEs(saveAbilitieEsEvent);
        console.log("abilitieEsEVENT--->", saveAbilitieEsEvent)
        setActive(value)
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
                            {getAbilities.map((i, index) => {
                                return (
                                    <li className="poke__abilities-item" key={index}>
                                        <button className={active === i ? "poke__abilities-btn-active" : "poke__abilities-btn"} onMouseOver={showAbilitie} value={i}>
                                          {active === i ? abilitieNameEs : i} 
                                        </button>
                                        </li>
                                )
                            })} 
                                    <p className="poke__abilities-text">{abilitieFilterEs}</p>
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

