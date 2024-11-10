import currentLanguage from "../language/currentLanguage.mjs"

const units = {
    carrier: { size: 5, id: currentLanguage.CARRIER_MESSAGE, symbol: "O" },
    battleship: { size: 4, id: currentLanguage.BATTLESHIP_MESSAGE, symbol: "K" },
    cruiser: { size: 3, id: currentLanguage.CRUISER_MESSAGE, symbol: "T" },
    submarine: { size: 3, id: currentLanguage.SUBMARINE_MESSAGE, symbol: "X" },
    destroyer: { size: 2, id: currentLanguage.DESTROYER_MESSAGE, symbol: "Q" }
}


export default units