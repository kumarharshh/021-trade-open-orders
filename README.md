Live Link: https://021-trade-open-orders-sknh.vercel.app/

# 📱 Open Orders - Mobile UI Implementation

This project is a mobile-first redesign of the **Open Orders** page based on the desktop version provided in the original design screenshot. The implementation focuses on responsiveness, usability on smaller screens, and preserving the core functionality and structure of the original design.

## 📁 Folder Structure

Components are organized based on hierarchy and reusability:

- `base/` – Common base components (e.g., buttons, tags, dropdowns)
- `ui/` – Basic UI components (e.g., SearchBar, Pagination)
- `L1/` – First-level layout components (e.g., Header, HamMenu)
- `L2/` – Context-specific UI blocks (e.g., Orders Table)
- `pages/` – Page-level compositions

## ✅ Features Implemented

- Responsive header with logo and live stock prices
- Search bar for **Client ID** and **Stock name**
- Sort and filter options with tags shown below the search bar
- Paginated table for open orders with:
  - Time, Client ID, Ticker, Side, Product, Qty, Price, Actions
- “Cancel All” button
- “Hamburger” menu for mobile (UI only)

## 📌 Assumptions Made

1. **Client name "Lalit"** was unclear from the design, so a general search bar was created that supports both **Client ID** and **Stock Name**.
2. The **"Actions"** column was assumed to contain only one action: **Delete**.
3. The **hamburger menu** has been implemented with animation, but no links were provided, so it currently has non-functional placeholder items.
4. When a **filter or sort** is applied, a **tag** appears below the search bar, similar to filter chips, for visual feedback.
5. When Download button is clicked the data is being downloaded in json.

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
npm run dev
```
