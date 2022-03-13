
/**
 * Search for a search phrase in all properties in an array of objects
 * 
 * Returns a set of results that have that search phrase
 * in object PROVIDED THAT IT IS IN THE FIRST LAYER
 * ( This method does NOT search for objects nested within )
 * 
 * @param items The items you are looking for the phrase in
 * @param searchPhrase The string you are looking for
 */
export const omniSearch = (items, searchPhrase) => {
    let results = [];

    // Trim the search phrase
    searchPhrase = searchPhrase.trim().toLowerCase();

    if (searchPhrase === "") {
        return items;
    }

    // Extract the properties from the first object
    // Assuming that all the items have the same properties
    // (To save n^2 of looping over the objects to collect all possible properties)

    // Loop over every item by each property
    // Add it to results array if it matches
    items.forEach(item => {
        if (searchValuesInObject(item, searchPhrase))
            results.push(item);
    });

    // Turn array of results to a set and return it
    return [...new Set(results)]
}


const searchValuesInObject = (item, searchPhrase) => {
    let values = Object.values(item);
    let found = false;

    values.forEach(value => {
        value = String(value).trim().toLowerCase();
        if (value.includes(searchPhrase))
            found = true;
    });

    return found;
}
