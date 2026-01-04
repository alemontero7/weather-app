# Weather App

A modern, responsive weather dashboard built with **React**, **TypeScript**, and **Tailwind CSS**.

This project implements **Hexagonal Architecture** on the frontend to decouple the User Interface from the Business Logic and External APIs, ensuring scalability, testability, and maintainability.

[Project Preview](https://weather-app-by-ale.vercel.app/) 

## Setting up the project

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alemontero7/weather-app
   cd weather-app
   ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Env variables:**
  Environment variables are available in the repo since a private API KEY is not needed to use the open meteo endpoints
4. **Run the development server:**
    ```bash
    npm run dev
    ```
5. Open [This link](http://localhost:5173) in your browser

## Architecture

This project moves away from the traditional "Component-based" logic often seen in React (where logic is coupled inside useEffect within components) and adopts Hexagonal Architecture.

### Why Hexagonal Architecture?
  1. Decoupling: The UI components (atoms/molecules) know nothing about the API. They only expect pure Domain Models.

  2. Interchangeability: We use Dependency Injection via Interfaces (ILocationRepository, IWeatherRepository). If we want to switch from Open-Meteo to OpenWeatherMap tomorrow, we only create a new Repository implementation. The UI and Use Cases remain untouched.

  3. Data Safety: APIs often change or return "ugly" data (arrays, snake_case). We use Mappers and DTOs to sanitize data at the system boundary (Infrastructure Layer), ensuring our application works with clean, typed objects.

### Layer Breakdown

The code is organized by **Modules** and inside each module, we follow strict layers:

* **Domain:**
    * Holds the Entities/Models.
    * Defines Interfaces/Ports.
    * *Rule:* No external dependencies allowed here.
* **Application (The Logic):**
    * Contains Use Cases.
    * Orchestrates the flow of data. It asks the Repository for data and gives it to the UI.
* **Infrastructure (The Implementation):**
    * **Repositories:** Concrete implementations.
    * **DTOs:** Types that match the exact shape of the API JSON.
    * **Mappers:** Functions that transform DTOs into Domain Models.
* **UI (The Presentation):**
    * **Atoms/Molecules:** Dumb components (buttons, cards) that only render data.
    * **Pages:** Uses molecules to display a composed UI

## Tech Stack
* Core: React + Vite
* Language: TypeScript
* Styling: Tailwind CSS
* Icons: Lucide React
* Data Source: Open-Meteo API (Free, no key required)
