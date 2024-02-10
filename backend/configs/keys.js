module.exports = {
    app: {
        name: "Shopper",
        apiURL: process.env.API_BASE_URL
    },
    port: process.env.PORT || 5000,
    jwt: {
        secret: process.env.SECRET_TOKEN,
        tokenLife: '7d'
    },
    db: {
        MONGO_URI: process.env.MONGO_DB_URI
    }
}