# 💳 PayQuick

A mobile and web app that allows users to send and receive money securely.

## 🛠️ Prerequisites

- **Node.js** v22.x

## 🚀 Features

- Login page with form validation
- User authentication using session storage
- Infinite scroll for viewing the transaction list
- Automatically refresh the access token when needed
- Continuous Integration (CI) setup for automated checks and builds

## 📦 Tech Stack

### Frontend

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-ui](https://github.com/shadcn-ui/ui)
- **Testing**: Jest & React Testing Library
- **Code Quality**:
  - ESLint
  - Prettier

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Bart-15/payquick
cd payquick
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `payquick/` folder:

```env
NEXT_PUBLIC_BASE_URL=your_backend_api
NEXT_PUBLIC_API_VERSION=v1
```

#### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Production Build

```bash
# Create production build
npm run build

# Preview production build locally (optional)
npm run start
```

## 🙋‍♂️ Author

Built by [Bart-15](https://github.com/Bart-15)  
**Software Engineer** | **AWS Certified Developer**
