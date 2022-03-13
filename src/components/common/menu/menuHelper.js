import AdjustIcon from '@mui/icons-material/Adjust';

/**
 * 
 * @param {required} name The name to be displayed for the action
 * @param {required} func The function to be called on that action clicked
 * @param icon The icon that appears for the action
 * 
 * @returns An object that describes the menu item for the all the action
 */

export const createMenuItem = (name, func, icon) => {
    if (!icon) {
        // Sets a default icon for the action if the user passes no icon
        icon = <AdjustIcon />
    }

    return {
        name,
        func,
        icon
    }
}