function randomIndex(list) {
    return Math.floor(Math.random() * list.length);
}

function cho_hangul(character) {
    cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    code = character.charCodeAt(0) - 44032;

    if(code <= -1 || code >= 11172) {
        return character;
    }

    return cho[ Math.floor(code / 588) ];
}