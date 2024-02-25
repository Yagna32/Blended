module.exports = {
    app: {
        name: "Shopper",
        apiURL: process.env.API_BASE_URL
    },
    port: process.env.PORT || 5000,
    jwtKeys: {
        ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN,
        REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN,
        refreshtokenLife: '1d',
        accesstokenLife:'360s',
        issuer: 'https://github.com/Yagna32'
    },
    db: {
        MONGO_URI: process.env.MONGO_DB_URI
    },
    payment: {
        STRIPE_KEY: process.env.STRIPE_API_KEY,
        FRONTEND_URL: process.env.FRONTEND_URL,
        SECRET_KEY: process.env.STRIPE_SECRET_KEY
    }
}