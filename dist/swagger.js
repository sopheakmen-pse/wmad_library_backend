"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WMAD LIBRARY BACKEND API",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Member: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                        },
                        member_code: {
                            type: "string",
                        },
                        fullname: {
                            type: "string",
                        },
                        date_of_birth: {
                            type: "string",
                            format: "date",
                        },
                        address: {
                            type: "string",
                        },
                        phone_number: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        },
                        start_date: {
                            type: "string",
                            format: "date",
                        },
                        expiry_date: {
                            type: "string",
                            format: "date",
                        },
                        is_active: {
                            type: "boolean",
                        },
                    },
                },
            },
            responses: {
                204: {
                    description: "Deleted successfully",
                    contents: "application/json",
                },
                400: {
                    description: "Missing API key - include it in the Authorization header",
                    contents: "application/json",
                },
                401: {
                    description: "Unauthorized - incorrect API key or incorrect format",
                    contents: "application/json",
                },
                404: {
                    description: "Not found",
                    contents: "application/json",
                },
                500: {
                    description: "Internal server error",
                    contents: "application/json",
                },
            },
        },
        security: [
            {
                Authorization: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // Path to the API docs
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    if (process.env.NODE_ENV === "production") {
        app.use("/api-docs", express_1.default.static("swagger-ui-dist/", { index: false }), swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    }
    else {
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    }
};
exports.default = setupSwagger;
