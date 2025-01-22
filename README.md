https://github.com/user-attachments/assets/7c1246e5-5fad-4c46-b244-13742b714423

# FlipBuddy - Digital Salesperson  
FlipBuddy is a digital salesperson designed to engage in real-time conversations, answer complex queries, and offer personalized recommendations. Developed for **Flipkart Grid 6.0 (Software Development Track)**, FlipBuddy aims to revolutionize the shopping experience by simulating human-like interactions using advanced AI technologies.

---

## Table of Contents  
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Installation and Setup](#installation-and-setup)  
4. [Usage](#usage)  

---

## Features  
- **Real-time Conversations**: FlipBuddy engages customers in natural and seamless conversations.  
- **AI-Driven Recommendations**: Provides personalized product suggestions based on user preferences.  
- **Interactive 3D Avatar**: A lifelike 3D avatar that synchronizes lip movements with audio to enhance the user experience.  
- **Speech-to-Text and Text-to-Speech Integration**: Converts user speech to text and vice versa for a smooth interaction experience.  
- **Optimized for Latency**: Implements caching and pre-trained ML models to achieve response times below 500ms.

---

## Tech Stack  
- **Frontend**: React.js  
- **Backend**: Flask (Python)  
- **Database**: MongoDB  
- **AI & ML**: TensorFlow, Scikit-Learn
- **Libraries**:  
  - React-Speech-Recognition  
  - Web Speech API  

---

## Installation and Setup  

### Prerequisites  
1. Node.js (v16 or higher)  
2. Python (v3.8 or higher)  
3. MongoDB (local or cloud setup)  

### Clone the Repository  
```bash  
https://github.com/techrajat/flipkart-grid-6.0.git 
cd flipkart-grid-6.0
```

## Frontend Setup  
**Navigate to the client folder:**  
```bash  
cd client  
```  

**Install dependencies:**  
```bash  
npm install  
```  

**Start the development server:**  
```bash  
npm start  
```  

---

## Backend Setup  
**Navigate to the server folder:**  
```bash  
cd server  
```  

**Create a virtual environment (optional but recommended):**  
```bash  
python -m venv venv  
source venv/bin/activate  # For Linux/macOS  
venv\Scripts\activate     # For Windows  
```  

**Install dependencies:**  
```bash  
pip install -r requirements.txt  
```  

**Start the backend server:**  
```bash  
flask app.py  
```  

---

## Database Configuration  
Install and set up MongoDB locally or use MongoDB Atlas for a cloud-based solution.  

**Update the database connection string in the server environment file (`.env`):**  
```python  
MONGO_URI = "your-mongodb-connection-string"  
```  

---

## Usage  
1. Open the frontend in your browser at [http://localhost:3000](http://localhost:3000).  
2. Ensure the backend is running at [http://localhost:5000](http://localhost:5000).  
3. Interact with FlipBuddy through voice commands and experience its AI-driven recommendations.  

---
