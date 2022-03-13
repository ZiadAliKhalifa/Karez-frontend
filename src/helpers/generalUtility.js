/**
 * change ios date formate to normal date time formate
 * @param {string} iosDate 
 */
export const convertIosFromateToDate = (iosDate) => {
    const converteddate = Date.parse(iosDate);
    const dateObject = new Date(converteddate);
    return dateObject.toLocaleString();
}