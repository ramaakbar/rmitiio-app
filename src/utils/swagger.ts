import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Rmitiio Docs",
      version,
    },
    components: {
      securitySchemas: {
        cookieRefreshToken: {
          type: "apiKey",
          in: "cookie",
          name: "jwt",
        },
        bearerAccessToken: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [],
  },
  apis: [
    "./src/routes.ts",
    "./src/api/auth/auth.route.ts",
    "./src/api/auth/auth.schema.ts",
    "./src/api/post/post.route.ts",
    "./src/api/post/post.schema.ts",
    "./src/api/user/user.route.ts",
    "./src/api/user/user.schema.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/api/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/api/docs`);
}
