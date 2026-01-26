# Practice Software Testing - Automation Framework

> **A robust, scalable test automation framework built with Playwright and JavaScript. Implements Page Object Model (POM) for UI and API testing, featuring dynamic data generation, custom logging, and automated end-to-end scenarios.**

## 🚀 How to Run the Tests

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
npx playwright install chromium
```

### 3. Running Tests
You can run all tests (UI and API) using the following commands:

*   **Run all tests (Headless):**
    ```bash
    npm test
    ```
*   **Run tests with UI Mode:**
    ```bash
    npx playwright test --ui
    ```
*   **View Test Report:**
    ```bash
    npx playwright show-report
    ```

---

## 🏗️ Framework Structure

The framework follows a modular pattern to ensure scalability and ease of maintenance:

```text
├── .config/             # Editor settings and configurations
├── api/
│   └── ApiClient.js         # Wrapper for API request logic
├── pages/
│   ├── BasePage.js          # Shared navigation and page utilities
│   ├── HomePage.js          # Locators and actions for navigation & search
│   ├── ContactPage.js       # Form validation and submission logic
│   ├── ProductPage.js       # Product details and "Add to Cart" actions
│   └── CartPage.js          # Cart management and price verification
├── tests/
│   └── interview_test.spec.js # Main test suite (UI & API scenarios)
├── utils/
│   ├── Config.js            # Environment URLs and global constants
│   ├── DataHelper.js        # Dynamic test data generation
│   └── Logger.js            # Standardized execution logging
├── playwright.config.js     # Playwright engine configuration
└── package.json             # Project dependencies and scripts
```

---

## 💡 Design Choices & Reasoning

### 1. Playwright as the Core Engine
I chose **Playwright** because of its native support for modern web architectures (Shadow DOM, async requests), its speed, and its built-in API testing capabilities. It provides superior stability through auto-waiting mechanisms and web-first assertions.

### 2. Page Object Model (POM)
To ensure the implementation is **scalable and adaptive**, I used the Page Object Model. By separating the test logic from the UI locators/interactions:
*   **Maintenance**: If a selector changes on the website, we only update it in one file (the Page Object), not in every test case.
*   **Readability**: Test scripts read like human-friendly scenarios (e.g., `contactPage.submitForm(...)`).

### 3. API & UI Layer Integration
The framework includes an `ApiClient` to demonstrate a **structured API testing layer**. This allows for:
*   Sanity checking backend endpoints without the UI overhead.
*   The potential for "Hybrid" testing (e.g., creating test data via API before running a UI test).

### 4. Dynamic Data & Utilities
*   **DataHelper**: Hardcoded test data can lead to collisions. The `DataHelper` generates fresh names/emails for every run, making tests more robust.
*   **Config Management**: Using a `Config.js` file allows the suite to adapt to different environments (Dev, Staging, Prod) by simply changing a single URL constant.

### 5. Stability Optimizations
*   **Workers**: I set `workers: 1` in the configuration for this project. While Playwright supports high parallelism, a single-worker run ensures that sequential operations on shared cart states or rate-limited API endpoints on the demo site don't fail intermittently.
*   **Network Synchronization**: In the "Add to Cart" task, I used `waitForResponse` to ensure the backend actually processed the item addition before the test attempted to navigate to the cart.

---

## 🛠️ Included Scenarios

1.  **Form Submission Validation**:
    *   Tests blank form submissions (Negative testing).
    *   Tests successful submission with valid data (Positive testing).
    *   Verifies 50-character minimum message requirements.
2.  **Cart Functionality**:
    *   Tests item addition to the cart.
    *   Tests quantity updates (e.g., 1 to 3 items).
    *   Verifies dynamic price calculation and state persistence.
3.  **API Verification**:
    *   Direct validation of the Contact Message endpoint.
    *   Verifies status codes and JSON response integrity.
