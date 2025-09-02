# AI Sentiment Analysis and Review Insights Dashboard

## Overview

This project is a **Sentiment Analysis web application** that allows users to input product or service reviews and see the sentiment (Positive, Neutral, or Negative) along with a **dashboard** showing insights such as the **total number of reviews** and **sentiment breakdown**.

* **Frontend**: Built with HTML, CSS, and JavaScript.
* **Backend**: Flask API powered by Python for sentiment analysis.
* **Automated Deployment**:

  * **Frontend**: Deployed via **GitHub Pages**.
  * **Backend**: Hosted on **Render**.
  * **Continuous Integration/Deployment (CI/CD)** using **GitHub Actions**.

---

## 📦 Prerequisites

* **GitHub account** (for hosting and deployment)
* **Render account** (for backend hosting)
* **Node.js** (if you want to run it locally)

---

## 🛠 Project Setup and Deployment

### 1. Clone the repository

```bash
git clone https://github.com/yaksh0210/ai-sentiment-project.git
cd ai-sentiment-project
```

---

### 2. Frontend Setup: Deploy on GitHub Pages

1. Go to **GitHub Repo → Settings → Pages**.
2. Set the **Source** branch to `gh-pages` (this will be created automatically).
3. After deploying changes, access your live website at:

   ```text
   https://yaksh0210.github.io/ai-sentiment-project/
   ```

   The frontend is deployed here. Every time you push changes to `frontend/` directory on the `main` branch, GitHub Actions will automatically deploy it to GitHub Pages.

---

### 3. Backend Setup: Deploy on Render

1. Go to **Render** ([https://render.com](https://render.com)) and create a new Web Service:

   * Choose **GitHub** as the source.
   * Select the `main` branch and choose the `backend` directory.
   * Set environment to **Python 3**, and use this command to start the backend:

     ```bash
     python app.py
     ```

2. Render will automatically deploy the backend every time you push changes to `backend/`.

   Your backend will be hosted on a Render-provided URL, e.g.:

   ```text
   https://sentiment-backend.onrender.com
   ```

---

### 4. GitHub Actions Workflow

* **Frontend Deployment (GitHub Pages)**:

  * The workflow file `.github/workflows/frontend-deploy.yml` is set up to auto-deploy the `frontend/` folder to **GitHub Pages** every time you push to the `main` branch.

* **Backend Deployment (Render)**:

  * The **Render** platform handles the backend deployment automatically when you push changes to the `backend/` folder on the `main` branch.

---

## 🚀 Usage

1. **Go to the frontend URL**: `https://yaksh0210.github.io/ai-sentiment-project/`
2. **Enter a review** in the text area and hit **Analyze**.
3. The app will call the backend to perform **Sentiment Analysis** and display the result (Positive, Neutral, or Negative).
4. The **Dashboard** shows review stats: the **total number of reviews**, and breakdowns of **positive**, **neutral**, and **negative** reviews. A chart displays these statistics visually.

---

## 🔧 Local Setup (Optional)

If you want to run the app locally:

1. **Frontend**:

   * Open `frontend/index.html` in any browser.
2. **Backend**:

   * Navigate to the `backend/` folder.

   * Install dependencies:

     ```bash
     pip install -r requirements.txt
     ```

   * Run the server:

     ```bash
     python app.py
     ```

   * The backend will be available at `http://localhost:5000`.

   * **Important**: Make sure the frontend `script.js` uses the correct backend URL (`http://localhost:5000` when testing locally).

---

## 💡 Key Features

* **Sentiment Analysis** using **TextBlob**.
* **Real-time dashboard** to monitor sentiment stats and chart visualizations.
* **Auto Deployment** with GitHub Actions:

  * **Frontend**: Deployed automatically to **GitHub Pages**.
  * **Backend**: Deployed automatically to **Render**.

---

## 🔒 License

This project is licensed under the MIT License.

---

### ✅ Conclusion

Now you have a fully deployed **AI-powered Sentiment Analysis app** with:

* **Frontend on GitHub Pages**
* **Backend on Render**
* **Automated deployments using GitHub Actions**

Enjoy analyzing reviews and tracking sentiment trends!

---

Feel free to copy-paste this into your **README.md** file, and it will guide users (or yourself) through the entire process from **local setup** to **live deployment**!

Let me know if you need any changes or additions to it!
