import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
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
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
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
        Book: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            author: { type: "string" },
            published_date: { type: "string", format: "date-time" },
            isbn: { type: "string" },
            genre: { type: "string" },
            available_copies: { type: "integer" },
          },
        },
        CreateBookIssueBody: {
          type: "object",
          properties: {
            member_id: { type: "integer" },
            book_id: { type: "integer" },
            issue_date: { type: "string", format: "date" },
            due_date: { type: "string", format: "date" },
            return_date: {
              type: "string",
              format: "date",
              nullable: true,
            },
            status_id: { type: "integer" },
            processed_by_id: { type: "integer" },
          },
          required: [
            "member_id",
            "book_id",
            "issue_date",
            "due_date",
            "status_id",
            "processed_by_id",
          ],
        },
        BookIssueTransaction: {
          type: "object",
          properties: {
            id: { type: "integer", example: 5 },
            transaction_code: { type: "string", example: "VB0SOR" },
            member_id: { type: "integer", example: 2 },
            book_id: { type: "integer", example: 1 },
            issue_date: {
              type: "string",
              format: "date-time",
              example: "2024-08-05T17:00:00.000Z",
            },
            due_date: {
              type: "string",
              format: "date-time",
              example: "2024-08-09T17:00:00.000Z",
            },
            return_date: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: null,
            },
            status_id: { type: "integer", example: 1 },
            processed_by_id: { type: "integer", example: 1 },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2024-08-06T03:18:12.739Z",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              example: "2024-08-06T03:18:12.739Z",
            },
          },
        },
        UpdateBookIssueBody: {
          type: "object",
          properties: {
            member_id: { type: "integer" },
            book_id: { type: "integer" },
            issue_date: { type: "string", format: "date" },
            due_date: { type: "string", format: "date" },
            return_date: {
              type: "string",
              format: "date",
              nullable: true,
            },
            status_id: { type: "integer" },
            processed_by_id: { type: "integer" },
          },
        },
        BookIssue: {
          type: "object",
          properties: {
            id: { type: "integer", example: 5 },
            transaction_code: { type: "string", example: "VB0SOR" },
            member_id: { type: "integer", example: 2 },
            book_id: { type: "integer", example: 1 },
            issue_date: {
              type: "string",
              format: "date-time",
              example: "2024-08-05T17:00:00.000Z",
            },
            due_date: {
              type: "string",
              format: "date-time",
              example: "2024-08-09T17:00:00.000Z",
            },
            return_date: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: null,
            },
            status_id: { type: "integer", example: 1 },
            processed_by_id: { type: "integer", example: 1 },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2024-08-06T03:18:12.739Z",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              example: "2024-08-06T03:18:12.739Z",
            },
            book: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                isbn: {
                  type: "string",
                  example: "7e146ad9-0ef8-42c5-8a8d-e2c7e3c7b22f",
                },
                title: { type: "string", example: "voluptatem alias beatae" },
              },
            },
            member: {
              type: "object",
              properties: {
                id: { type: "integer", example: 2 },
                member_code: { type: "string", example: "nMolPP" },
                fullname: { type: "string", example: "Sophea Men" },
                is_active: { type: "boolean", example: true },
              },
            },
            processed_by: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                username: { type: "string", example: "admin" },
                email: { type: "string", example: "admin@wmad.demo" },
                user_role_name: { type: "string", example: "Admin" },
              },
            },
            status: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                name: { type: "string", example: "Checked Out" },
              },
            },
          },
        },
        UserAccount: {
          type: "object",
          properties: {
            id: { type: "integer" },
            user_role_id: { type: "integer" },
            email: { type: "string" },
            username: { type: "string" },
            password: { type: "string" },
            is_activated: { type: "boolean" },
            is_active: { type: "boolean" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            user_role: { $ref: "#/components/schemas/UserRole" },
          },
        },
        BookIssueStatus: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
        },
        UserRole: {
          type: "object",
          properties: {
            id: { type: "integer" },
            role_name: { type: "string" },
          },
        },
      },
      responses: {
        204: {
          description: "Deleted successfully",
          contents: "application/json",
        },
        400: {
          description:
            "Missing API key - include it in the Authorization header",
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

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
