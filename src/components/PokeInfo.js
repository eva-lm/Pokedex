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
    const [abilitieName, setAbilitieName] = useState();
    const [abilitieFilterEs, setAbilitieFilterEs] = useState();
    const [changeLang, setChangeLang] = useState(true);
    const [language, setLanguage] = useState("en");
    const [active, setActive] = useState("")

    let { id } = useParams();
    let getAbilities;
    let getTypes;
    let abilitieUrl;

    useEffect(() => {
        const fetchData = () => {
            fetchService(urlPokeInfo + id)
                .then(data =>
                    setPokeInfo(data));
        };
        fetchData();
    }, []);

    
    useEffect(() => {
        fetchInfoAbilitie(abilitieUrl)
    }, [pokeInfo])
    
    // //Llamamos al filterAbilitie cuando nos aseguramos que el state pokeAbilitie ha seteado un valor
    useEffect(() => {
        filterAbilitie()
    }, [pokeAbilitie])

    //cuando cambia el valor de language se vuelve a ejecutar filterAblite
    useEffect(() => {
        filterAbilitie()
        translateAbilties()
    },[language])

    useEffect(() => {
        showLanguage()
    }, )


    const getMorePokeInfo = function () {
        //Abilities
        const mapAbilities = pokeInfo.abilities.map(i => i.ability);
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
                            ... prevAbility, abilityData
                        ]
                    }), 1000)
                })
            }
        } 
    };

    const showLanguage = () => {
        if (changeLang === true) {
            setLanguage("en");
        } else {
            setLanguage("es");
        }
    }
    const filterAbilitie = () => {
        if (pokeAbilitie.length) {
        const filterAbilitiesText = pokeAbilitie[0].flavor_text_entries.filter(i => i.language.name === language)
        const firstAbilitieText = filterAbilitiesText[filterAbilitiesText.length -1].flavor_text;
        setAbilitieFilterEs(firstAbilitieText);
        setActive(pokeAbilitie[0].name)
        setAbilitieName(getAbilities);
        }
    }
    const translateAbilties = () => {
        if (pokeAbilitie.length) {
        const filterAbilitiesName = pokeAbilitie.map(i => i.names.filter(i => i.language.name === language))
        const filterAbilitiesNameFlat = filterAbilitiesName.flat()
        const getAbilitieNameTranslate = filterAbilitiesNameFlat.map(i => i.name)
        setAbilitieName(getAbilitieNameTranslate)
        }

    }
    const showAbilitie = (e) => {
        const value = e.currentTarget.value.toLowerCase();
        console.log("value", value)
        const handleFilterAbilitie = pokeAbilitie.filter(i => i.name === value);
        console.log("handleFilterAbilitie", handleFilterAbilitie)
        const handleAbilitie = handleFilterAbilitie.map(i => i.flavor_text_entries.filter(i => i.language.name === language));
        const handleSelectAbilitie = handleAbilitie.map( i => i[i.length -1]);
        const handleSelectAbilitieText = handleSelectAbilitie.map(i => i.flavor_text);
        setAbilitieFilterEs(handleSelectAbilitieText);
        setActive(value)

        console.log("text", abilitieFilterEs)
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
                        <button className="poke__select-lang" onClick={ () =>  setChangeLang(!changeLang)}>
                            <span className={changeLang === true ? "on" : "off"}>EN</span> 
                            <span className="space">/</span>
                            <span className={changeLang === true ? "off" : "on"}>ES</span>
                        </button>
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
                            {abilitieName != undefined ? (
                            abilitieName.map((i, index) => {
                                return (
                                    <li className="poke__abilities-item" key={index}>
                                        <button className={active === i ? "poke__abilities-btn-active" : "poke__abilities-btn"} onMouseOver={showAbilitie} value={i}>
                                          {/* {active === i ? abilitieNameEs : i}  */}
                                          {i}
                                        </button>
                                        </li>
                                )
                            })
                            ) : ("")}

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

