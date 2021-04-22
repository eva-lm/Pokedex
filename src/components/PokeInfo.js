import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import "../stylesheets/layout/PokeInfo.scss";
import PokeLogo from "../images/Pokemon-Logo.png";

import bug from "../icons/bug.png";
import dark from "../icons/dark.png";
import dragon from "../icons/dragon.png";
import electric from "../icons/electric.png";
import fairy from "../icons/fairy.png";
import fight from "../icons/fight.png";
import fire from "../icons/fire.png";
import flying from "../icons/flying.png";
import ghost from "../icons/ghost.png";
import grass from "../icons/grass.png";
import ground from "../icons/ground.png";
import ice from "../icons/ice.png";
import normal from "../icons/normal.png";
import poison from "../icons/poison.png";
import psychic from "../icons/psychic.png";
import rock from "../icons/rock.png";
//import shadow from "../icons/shadow.png";
import steel from "../icons/steel.png";
//import unknown from "../icons/unknown.png";
import water from "../icons/water.png";



const PokeInfo = () => {
    const [pokeInfo, setPokeInfo] = useState();
    const [pokeAbilitie, setPokeAbilitie] = useState();
    const [abilitieFilterEs , setAbilitieFilterEs] = useState();
    let {id} = useParams();
    const urlPokeInfo = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let getAbilities;
    let getTypes;
    let getStats;

    const typeIcons = {
        "bug": bug,
        "dark": dark,
        "dragon": dragon,
        "electric": electric,
        "fairy": fairy,
        "fighting": fight,
        "fire": fire,
        "flying": flying,
        "ghost": ghost,
        "grass": grass,
        "ground": ground,
        "ice": ice,
        "normal": normal,
        "poison": poison,
        "psychic": psychic,
        "rock": rock,
      //  "shadow": shadow,
        "steel": steel,
      //  "unknown": unknown,
        "water": water
    }

    useEffect( () => {
        const fetchData = () => {
            fetch(urlPokeInfo).then(res => res.json())
            .catch((error) => console.log("error fetch poke info", error))
            .then(data =>
            setPokeInfo(data));
        };
        fetchData();
    }, []);


    const getMorePokeInfo = function() {
        //Abilities
        const mapAbilities = pokeInfo.abilities.map(i => i.ability);
        getAbilities = mapAbilities.map(i => i.name);
        //Types
        const mapTypes = pokeInfo.types.map(i => i.type);
        getTypes = mapTypes.map(i => i.name);
        // const urlType = mapTypes.map(i => i.url);
        // console.log("name types", getTypes);
        // console.log("url types", urlType);///URLS TYPE fetch

        //Stats
        let jeje

            for (let i of pokeInfo.stats) {
                    
                    jeje = {
                        base: i.base_stat,
                        effort: i.effort,
                        //name: toli.name
                    };

            }
        console.log("pokeinfo.stats", pokeInfo.stats)
        console.log("statttt--->", jeje)
    }
    
    if(pokeInfo !== undefined) {
        getMorePokeInfo()
    } 
    const showAbilitie = (e) => {
        const value = e.currentTarget.value;
        const abilities = pokeInfo.abilities.map(i => i.ability)
        const filter = abilities.filter(i => i.name === value)
        const abilitieUrl = filter.map(i => i.url);
        fetchInfoAbilitie(abilitieUrl)
    }
    const fetchInfoAbilitie = (abilitieUrl) => {
        fetch(abilitieUrl).then(res => res.json())
        .catch((error) => console.log("error en el fetch abilitie ->", error))
        .then(data => 
            setPokeAbilitie(data))
        if (pokeAbilitie !== undefined) {
        filterAbilitie()
        }
    }
    const filterAbilitie = () => {
            const filterAbilitiesText = pokeAbilitie.flavor_text_entries.filter(i => i.language.name === "es")
            const getAbilitiesTextEs = filterAbilitiesText.map(i => i.flavor_text)
            const saveAbilitiesEs = getAbilitiesTextEs[getAbilitiesTextEs.length -1]
            setAbilitieFilterEs(saveAbilitiesEs)
        }


    return (
        <div className="poke">
            <div className="poke__back">
                <Link className="poke__back-link" to="/">Go Back</Link>
            </div>
            <img className="poke__logo" src={PokeLogo} alt="logo pokemon" />
                {pokeInfo !== undefined ? (
                <div className="poke__card">
                    <div className="poke__header">
                        <h3 className="poke__header-title">{pokeInfo.name.toUpperCase()}</h3>
                        {/* <h4>Type: </h4> */}
                        <ul className="poke__types">
                        {getTypes.map((i, indx) =>{
                              console.log("aaaa",typeIcons[i])
                            return(
                                <li className="poke__types-item" key={indx}>
                                <img className="poke__types-icon" src={typeIcons[i]} alt="icon type" /></li>
                            )
                        })}
                        </ul>
                    </div>
                    <div className="poke__img-content">
                        <h4 className="poke__header-id">ID: {id}</h4>
                        <div className="poke__main">
                            {pokeInfo.sprites.other.dream_world.front_default !== null ?
                                <img className="poke__main-img" src={pokeInfo.sprites.other.dream_world.front_default} alt="dream world" />
                            : "" }
                            {pokeInfo.sprites.other.dream_world.front_female !== null ?
                                <img className="poke__main-img" src={pokeInfo.sprites.other.dream_world.front_female} alt="dream world female" />
                            : "" }
                        </div>
                        <div className="poke__imgs-view">        
                            {pokeInfo.sprites.front_default !== null ? ( <div>
                                <img src={pokeInfo.sprites.front_default} alt="pokemon front view" /> 
                            </div>
                            ) : ""}
                            {pokeInfo.sprites.back_default !== null ? (
                            <div>
                                <img src={pokeInfo.sprites.back_default} alt="pokemon back view" />
                            </div>
                            ) : ""} 
                        </div>
                        {/* {pokeInfo.sprites.other.official-artwork.front_default !== null ?
                        <img src={pokeInfo.sprites.other.official-artwork.front_default} alt="official" />
                        : "" } */}
                      
                        </div>
                        

                        <h4>Height: {pokeInfo.height}</h4>
                        <h4>Weight: {pokeInfo.weight}</h4>
                        <h4>Base Experience {pokeInfo.base_experience}</h4>
                        <h4>Abilities:</h4>
                        <ol>
                        <p>{abilitieFilterEs}</p>
                        {getAbilities.map((i, index) => {
                            return (
                                <li key={index}>
                                    <button onMouseOver={showAbilitie} value={i}>
                                    {i}
                                    </button></li>
                            )
                        })}
                        </ol>
                        <ol>

                        </ol>
                        {pokeInfo.stats.map((i, index) => {
                                return (
                                    <div>
                                    <li> 
                                        <p>Base Stat {i.base_stat}</p>
                                        <p>Effort {i.effort}</p>
                                      
                                    </li>
                                    </div>
                                )
                        })}
                    </div>
                  ) : ("")}
            IS POKEMON! A CACHU POWEEERRRR
        </div>
    )
}


export default PokeInfo

