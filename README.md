# 🥐 French Bakery E-Commerce

> No vibe coding.

A full-stack e-commerce web application for a French bakery, built to deliver a seamless shopping experience. 
The project focuses on advanced routing, robust state management, smooth animations, and a high-quality UI/UX.

## 🚀 Tech Stack Overview
* **Framework:** Next.js (App Router, Server Actions),TS
* **Styling:** SCSS (BEM Methodology)
* **Animations:** Framer Motion, GSAP
* **State Management:** Zustand
* **Database & ORM:** PostgreSQL, Drizzle ORM
* **Forms & Validation:** React Hook Form, Zod
* **Payments:** Stripe

---

## ⚙️ Core Features & Functionality

### 🛒 E-Commerce & Checkout
* **Advanced Cart System:** State synced with `localStorage`, plus the ability to generate a link to **share the cart** with others.
* **Promo Codes:** Built-in logic for applying discounts.
* **Smart Forms:** Checkout form fields are saved in `sessionStorage` to prevent data loss on accidental reload, backed by strict field validation.
* **Payments & Billing:** Secure Stripe integration with a dedicated success page and automated email receipts.

### 🧠 Architecture & Routing
* **Next.js App Router:** Utilization of Parallel Routes and Route Groups for a clean architectural structure.
* **Server Actions:** Secure and optimized data mutations without heavy API layers.
* **Resilience:** Configured fetch retries for the product catalog and category tabs to ensure data availability during network hiccups.

### 💾 Data & State Management
* **Database:** PostgreSQL managed via Drizzle ORM for type-safe database operations.
* **State:** Global client-side state efficiently managed with Zustand.

### ✨ UI / UX & Animations
* **Responsive Design:** Fully adaptive layouts built with SCSS following the BEM methodology.
* **Graceful Degradation:** Custom Global Error boundaries and a designed 404 page.
* **Loading States:** Comprehensive use of loaders and skeleton screens to prevent layout shifts and improve perceived performance.
* **Micro-interactions:** Toaster notifications for user feedback.
* **Fluid Animations:**
    * **Framer Motion:** Smooth transitions for the product catalog, cart interactions, and delivery driver cards.
    * **GSAP:** Complex, high-performance appearance animations for modal windows.