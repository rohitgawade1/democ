
export const RegExOnlyText = (text) => {
    let regex = new RegExp(/^[a-zA-Z ]*$/)
    if (regex.test(text) || text === "") {
        return false
    } else {
        return true
    }
}

export const RegExAlphabetsandSpecialCharacters = (text) => {
    let regex = new RegExp(/^[ A-Za-z_@./#&+-]*$/)
    if (regex.test(text) || text === "") {
        return false
    } else {
        return true
    }
}

export const RegExNumbersOnly = (text) => {
    let regex = new RegExp(/^[0-9]*$/)
    if (regex.test(text) || text === "") {
        return false
    } else {
        return true
    }
}

export const RegExMobile = (text) => {
    let regex = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    if (regex.test(text) || text === "") {
        return false
    } else {
        return true
    }
}

export const RegExEmail = (text) => {
    let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    if (regex.test(text) || text === "") {
        return false
    } else {
        return true
    }
}