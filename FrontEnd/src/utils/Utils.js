export function removeSpecialCharacters(value) {
    return value.replace(/[^\d]/g, '');
}