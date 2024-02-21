//  This version is , stateful tokens, Cons- on every refresh, user get logged out
const sessionIdToUserMap = new Map();

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}

module.exports = {setUser, getUser,}
