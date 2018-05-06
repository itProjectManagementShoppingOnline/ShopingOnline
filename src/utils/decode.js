export function JWTDecodeToJSON(str) {
  const decodeStr = decodeURIComponent(atob(str.split('.')[1]).split('')
    .map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
  return JSON.parse(decodeStr);
}

export function getUserIDbyDecodeJSON(str) {
  return JWTDecodeToJSON(str).user_id;
}
