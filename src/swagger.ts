// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import { Express } from "express";

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Golazo FC API",
//             version: "1.0.0",
//             description: "API for Golazo FC Admin and Player management",
//         },
//         servers: [
//             {
//                 url: "http://localhost:3000/api",
//             },
//         ],
//         components: {
//             securitySchemes: {
//                 BearerAuth: {
//                     type: "http",
//                     scheme: "bearer",
//                     bearerFormat: "JWT",
//                 },
//             },
//         },
//         security: [{ BearerAuth: [] }],
//     },
//     apis: ["./src/routes/*.ts"], // Path to your route files
// };

// const specs = swaggerJsdoc(options);

// export const setupSwagger = (app: Express) => {
//     app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
// };
