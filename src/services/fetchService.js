//URLs de la aplicación
export const url = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0";
export const urlPokeTypesList = "https://pokeapi.co/api/v2/type/"
export const urlMorePokemon = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=";
export const urlPokeInfo = "https://pokeapi.co/api/v2/pokemon/";

//Métodos para el fetch
export const HTTPMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

//Servicio Fetch
export const fetchService = async (path, state, method = HTTPMethods.GET, bodyObject = '') => {
    let headers = new Headers();
    let response;
    switch (method) {
        case HTTPMethods.GET:
            response = fetch(path, {
                headers: headers,
                method: HTTPMethods.GET,
            }).then(res => res.json()).catch(err => {
                console.log("Error getting: ", err);
            });
            break;
        case HTTPMethods.POST:
            response = fetch(path, {
                headers: headers,
                method: HTTPMethods.POST,
                body: JSON.stringify(bodyObject)
            }).then(res => res.json()).catch(err => {
                console.log("Error posting: ", err);
            });
            break;
        case HTTPMethods.PUT:
            response = fetch(path, {
                headers: headers,
                method: HTTPMethods.PUT,
                body: JSON.stringify(bodyObject)
            }).then(res => res.json()).catch(err => {
                console.log("Error putting: ", err);
            });
            break;
        case HTTPMethods.DELETE:
            response = fetch(path, {
                headers: HTTPMethods.DELETE,
                method: method,
            }).then(res => res.json()).catch(err => {
                console.log("Error deleting: ", err);
            });
            break;
        default:
            response = fetch(path, {
                headers: headers,
                method: HTTPMethods.GET,
            }).then(res => res.json()).catch(err => {
                console.log("Error getting: ", err);
            });
    }
    return response;
}



