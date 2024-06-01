/**
 * 
 * @param {string} txt - Die Beschreibung wird abgekürzt
 * @param {number} [max=50] - Die maximale Textlänge
 * @returns text bis maximale Länge von 50 dann ...
 */
export function txtSlicer(txt: string, max: number = 50) {
    if (txt.length >= max) return `${txt.slice(0, max)} ...`;
    return txt
}
