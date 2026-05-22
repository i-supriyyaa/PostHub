const app = require("./src/app");
const connectDB = require ("./src/db/db");

(async () => {
    try {
        await connectDB();

        app.listen(3000, () => {
            console.log("server is running on port 3000...");    
        })
    } catch (error) {
        console.error("failed to start server:", error);
        process.exit(1);
    }
})();