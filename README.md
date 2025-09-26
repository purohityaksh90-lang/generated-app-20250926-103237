# Clarity - Personal Expense Tracker

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/purohityaksh90-lang/generated-app-20250926-103120)

Clarity is a visually stunning, minimalist personal expense tracking application designed for simplicity and elegance. It enables users to effortlessly log their income and expenses, categorize transactions, and gain clear insights into their spending habits through beautiful, interactive visualizations. The application features a central dashboard for a quick overview, a detailed transaction history with search and filter capabilities, and a streamlined process for adding new entries. The entire experience is designed to be intuitive, fast, and delightful, transforming the chore of expense tracking into a satisfying activity.

## ✨ Key Features

-   **At-a-Glance Dashboard**: A central hub providing a quick overview of your financial status, including total balance, income, and expenses.
-   **Visual Spending Insights**: A beautiful, interactive bar chart visualizes your spending by category, helping you understand where your money goes.
-   **Recent Transactions**: Instantly see your latest financial activities right on the dashboard.
-   **Comprehensive History**: A detailed transaction page with powerful search and filtering capabilities.
-   **Effortless Data Entry**: A streamlined, fast, and intuitive form for adding new income or expenses.
-   **Modern & Minimalist UI**: A clean, data-focused design built with shadcn/ui for a polished and consistent user experience.
-   **Persistent Local Storage**: All your data is securely saved in your browser across sessions, ensuring privacy and speed.
-   **Fully Responsive**: Flawless performance and layout across all device sizes, from mobile to desktop.

## 🚀 Technology Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Data Visualization**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)
-   **Deployment**: [Cloudflare Pages & Workers](https://workers.cloudflare.com/)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   [Git](https://git-scm.com/) for cloning the repository.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/clarity_expense_tracker.git
    cd clarity_expense_tracker
    ```

2.  **Install dependencies:**
    This project uses `bun` for package management.
    ```sh
    bun install
    ```

3.  **Run the development server:**
    ```sh
    bun run dev
    ```

The application will be available at `http://localhost:3000` (or the next available port).

## 🖥️ Usage

Once the application is running, you can start tracking your finances:

-   **Add a Transaction**: Click the "Add Transaction" button in the header to open the form. Fill in the details for an income or expense and save it.
-   **View Dashboard**: The dashboard will automatically update with your latest financial summary and charts.
-   **Explore Transactions**: Navigate to the "Transactions" page to see a complete history of all your entries.

## 📜 Available Scripts

-   `bun run dev`: Starts the Vite development server with hot-reloading.
-   `bun run build`: Compiles and bundles the application for production.
-   `bun run lint`: Runs the ESLint checker to find and fix code quality issues.
-   `bun run deploy`: Deploys the application to Cloudflare.

## ☁️ Deployment

This project is configured for seamless deployment to the Cloudflare network.

### One-Click Deploy

You can deploy your own version of this application with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/purohityaksh90-lang/generated-app-20250926-103120)

### Manual Deployment with Wrangler

1.  **Login to Cloudflare:**
    If you haven't already, authenticate Wrangler with your Cloudflare account.
    ```sh
    npx wrangler login
    ```

2.  **Build the application:**
    First, create a production build of the frontend application.
    ```sh
    bun run build
    ```

3.  **Deploy:**
    Run the deploy script to publish your application and worker to Cloudflare.
    ```sh
    bun run deploy
    ```

Wrangler will handle the process of uploading your static assets and worker script. After deployment, you will receive a URL for your live application.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.