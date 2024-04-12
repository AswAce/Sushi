const useBikesApi = () => {
    const baseUrl = "http://localhost:8181/items";

    const getBike = (bikeId) => {
        return fetch(`${baseUrl}/${bikeId}`)
            .then(response => response.json())
    }

    const getBikesByType = (productType) => {
        const queryParams = new URLSearchParams({ productType }).toString(); // Correctly construct query parameters
        const url = `${baseUrl}?${queryParams}`; // Append query parameters to the base URL/ Append query parameters to the base URL
        console.log(productType)
        return fetch(url)
            .then(response => response.json());
    }


    // const countBikeResults = (title) => {

    //     let where = `where=title%20LIKE%20${JSON.stringify(title)}`;

    //     return fetch(`${baseUrl}?${where}&count`)
    //         .then(response => response.json())
    // }

    // return { getBike, getBikesByType, countBikeResults };
    return { getBike, getBikesByType };

}

export default useBikesApi;