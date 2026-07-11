# 🏡 RentNest API

A RESTful backend for a house rental platform where landlords can list properties, tenants can request rentals, make payments using Stripe Checkout, and leave reviews.

### 🌐 Live URL
*https://rentnest-api.vercel.app*

---

### 🌟 Core Features

- **Authentication:** Secure Register, Login, Logout, and Refresh Token handling.
- **Role-Based Access Control:** Strict authorization layers for `ADMIN`, `LANDLORD`, and `TENANT`.
- **Property Management:** Full CRUD operations for landlords, along with public listings featuring advanced filtering, searching, pagination, and sorting.
- **Rental Request Workflow:** Atomic booking logic where landlords approve/reject requests (only one approved request can active-lock a property).
- **Stripe Integration:** Programmatic Stripe Checkout session generation and cryptographically verified Webhooks.
- **Review System:** Closed-loop property reviews allowed only for tenants with `COMPLETED` stays.

---

### 🛠️ Tech Stack

- **Runtime & Language:** Node.js, TypeScript
- **Framework & ORM:** Express.js, Prisma ORM
- **Database:** PostgreSQL
- **Security & Validation:** JWT (Access & Refresh Tokens), Bcrypt, Zod Validation
- **Integrations:** Stripe

---

### 🚀 API Endpoints

#### 🔐 Authentication
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new account |
| `POST` | `/api/auth/login` | Public | Login and receive tokens |
| `POST` | `/api/auth/me` | Landlord / Tenant / Admin | Get current user profile |

#### 👥 Users
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Admin | View all platform users |
| `PATCH` | `/api/users/status/:id` | Admin | Update user status (e.g., ACTIVE/BANNED) |

#### 📂 Categories
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/categories` | Admin | Create a new property category |
| `GET` | `/api/categories` | Public | Get all property categories |
| `GET` | `/api/categories/:id` | Public | Get category with property |

#### 🏘️ Properties
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/properties` | Landlord | Create a new rental listing |
| `GET` | `/api/properties` | Public | Get listings (searching, filtering, sorting, pagination) |
| `GET` | `/api/properties/:id` | Public | Get specific property details |

#### 📋 Rental Requests
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/rentals` | Tenant | Apply to rent an available property |
| `GET` | `/api/rentals/me` | Tenant | View all my submitted rental requests |
| `GET` | `/api/rentals/me/:id` | Tenant | View a specific request detail |
| `GET` | `/api/landlord/rentals/requests` | Landlord | View incoming requests for owned properties |
| `GET` | `/api/landlord/rental-requests/:id`| Landlord | View detailed data of a single incoming request |
| `PATCH` | `/api/landlord/rentals/requests`| Landlord | Approve or Reject a rental request |

#### 💳 Payments
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/create` | Tenant | Initialize a Stripe Checkout Session |
| `POST` | `/api/payments/confirm` | Public (Stripe Webhook)| Confirm payment |
| `GET` | `/api/payments/me` | Tenant | View personal payment ledger history |
| `GET` | `/api/payments/me/:id` | Tenant | View specific invoice details |

#### 💬 Reviews
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/reviews` | Tenant (Post-Stay) | Submit property review (Status: COMPLETED) |

---

### 📦 Response Format

#### Success Standard (200 / 201)
```json
{
  "success": true,
  "message": "Resource processed successfully",
  "data": {}
}