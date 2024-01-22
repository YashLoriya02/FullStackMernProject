const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const n = characters.length;
    
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * n);
        result += characters.charAt(index);
    }
    return result;
}

module.exports = generateRandomString
