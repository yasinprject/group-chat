// 🔥 Firebase config
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

// Database
const database = firebase.database();
const messagesRef = database.ref("messages");

let currentUser = "";

// Join chat
function joinChat() {
  const nameInput = document.getElementById("username");
  if (nameInput.value.trim() === "") return;

  currentUser = nameInput.value.trim();
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("chatBox").classList.remove("hidden");
}

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

// Receive messages
messagesRef.on("child_added", function (snapshot) {
  const data = snapshot.val();
  const messagesDiv = document.getElementById("messages");

  const msgDiv = document.createElement("div");
  msgDiv.className = "message";
  msgDiv.innerHTML = `<span class="username">${data.user}:</span> ${data.message}`;

  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});