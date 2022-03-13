/**
 * @param {Required - String} displayName The header name that will be displayed in the table
 * @param {Required - String} objectKey The object key this column will contain
 * @param {Not required - String} helperContent Content that will appear in a helper icon next to that header if present
 * 
 * @returns An object that will feed this data to a table
 */
export const createTableHeader = (displayName, objectKey, helperContent, suffix) => {
    return {
        name: displayName,
        key: objectKey,
        helperContent: helperContent,
        suffix: suffix
    }
}
