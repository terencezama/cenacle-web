// ####################################################

export const request = (type) => {
    return `${type}_REQUEST`;
}
export const failure = (type) => {
    return `${type}_FAILURE`;
}
export const success = (type) => {
    return `${type}_SUCCESS`;
}
// ####################################################
export const create = (type) => {
    return `${type}_CREATE`;
}
export const remove = (type) => {
    return `${type}_DELETE`;
}
export const update = (type) => {
    return `${type}_UPDATE`;
}
export const list = (type) => {
    return `${type}_LIST`;
}
// ####################################################
export const LOGIN = "LOGIN";
export const SHARE = "SHARE";