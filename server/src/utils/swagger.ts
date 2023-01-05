import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../../swagger.json";

export default function swaggerDocs(app: Express) {
  // Swagger page
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

  // Docs in JSON format
  app.get("/api/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerJson);
  });

  console.log(`Swagger docs available at /api/docs`);
}
