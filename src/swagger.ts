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
            transaction_code: { type: "string" },
            member_id: { type: "integer" },
            book_id: { type: "integer" },
            issue_date: { type: "string", format: "date-time" },
            due_date: { type: "string", format: "date-time" },
            return_date: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            status_id: { type: "integer" },
            processed_by_id: { type: "integer" },
          },
          required: [
            "transaction_code",
            "member_id",
            "book_id",
            "issue_date",
            "due_date",
            "status_id",
            "processed_by_id",
          ],
        },
        UpdateBookIssueBody: {
          type: "object",
          properties: {
            transaction_code: { type: "string" },
            member_id: { type: "integer" },
            book_id: { type: "integer" },
            issue_date: { type: "string", format: "date-time" },
            due_date: { type: "string", format: "date-time" },
            return_date: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            status_id: { type: "integer" },
            processed_by_id: { type: "integer" },
          },
        },
        BookIssue: {
          type: "object",
          properties: {
            id: { type: "integer" },
            transaction_code: { type: "string" },
            member_id: { type: "integer" },
            book_id: { type: "integer" },
            issue_date: { type: "string", format: "date-time" },
            due_date: { type: "string", format: "date-time" },
            return_date: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            status_id: { type: "integer" },
            processed_by_id: { type: "integer" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            book: { $ref: "#/components/schemas/Book" },
            member: { $ref: "#/components/schemas/Member" },
            processed_by: { $ref: "#/components/schemas/UserAccount" },
            status: { $ref: "#/components/schemas/BookIssueStatus" },
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
