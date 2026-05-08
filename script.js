// 🔥 Firebase config (আপনার দেওয়া কনফিগারেশন)
const firebaseConfig = {
  apiKey: "AIzaSyA4vDII7ZpPUiRcQ9RoSz0nPEdCC7RUt0c",
  authDomain: "group-chat-9cd78.firebaseapp.com",
  databaseURL: "https://group-chat-9cd78-default-rtdb.firebaseio.com",
  projectId: "group-chat-9cd78",
  storageBucket: "group-chat-9cd78.firebasestorage.app",
  messagingSenderId: "319000453346",
  appId: "1:319000453346:web:7ee088bff9990093d7bebb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database Reference
const database = firebase.database();
const messagesRef = database.ref("messages");

let currentUser = "";

// Join chat
function joinChat() {
  const nameInput = document.getElementById("username");
  if (nameInput.value.trim() === "") {
      alert("Please enter your name!");
      return;
  }

  currentUser = nameInput.value.trim();
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("chatBox").classList.remove("hidden");
}

// "Enter" চাপলে লগইন হবে
document.getElementById("username").addEventListener("keypress", function(event) {
  if (event.key === "Enter") joinChat();
});

// Send message
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (text === "") return;

  messagesRef.push({
    user: currentUser,
    message: text,
    time: Date.now()
  });

  input.value = "";
}

// "Enter" চাপলে মেসেজ সেন্ড হবে
document.getElementById("messageInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") sendMessage();
});

// Receive messages and Display
messagesRef.on("child_added", function (snapshot) {
  const data = snapshot.val();
  const messagesDiv = document.getElementById("messages");

  // টাইম ফরম্যাট করা (যেমন: 10:30 AM)
  const timeString = new Date(data.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const msgWrapper = document.createElement("div");
  msgWrapper.className = "message-wrapper";

  // চেক করা মেসেজটি আমার নাকি অন্যের
  if (data.user === currentUser) {
      msgWrapper.classList.add("sent");
  } else {
      msgWrapper.classList.add("received");
  }

  msgWrapper.innerHTML = `
      <div class="message">
          <span class="username">${data.user}</span>
          <span class="text">${data.message}</span>
          <span class="time">${timeString}</span>
      </div>
  `;

  messagesDiv.appendChild(msgWrapper);
  
  // নতুন মেসেজ আসলে অটোমেটিক নিচে স্ক্রল হবে
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
