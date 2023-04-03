import { app } from "./app";
import { bandRouter } from "./routes/BandRouter";
import { userRouter } from "./routes/UserRouter";

app.use("/users", userRouter)
app.use("/bands", bandRouter)
