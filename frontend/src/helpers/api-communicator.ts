export const loginUser = async (email: string, password: string) => {
  const response = await fetch("/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to login");
  }

  const data = await response.json();
  return data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const response = await fetch("http://localhost:5000/api/v1/user/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to Signup");
  }

  const data = await response.json();
  return data;
};

export const checkAuthStatus = async () => {
  const response = await fetch("http://localhost:5000/api/v1/user/auth-status", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to authenticate");
  }

  const data = await response.json();
  return data;
};

export const sendChatRequest = async (message: string) => {
  const response = await fetch("http://localhost:5000/api/v1/chat/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    credentials: "include",
  });

  if (!response.ok) {
    console.error('Server Error:', await response.text());
    throw new Error('Server returned an error.');
  }

  const data = await response.json();
  return data;
};

export const getUserChats = async () => {
  const response = await fetch("http://localhost:5000/api/v1/chat/all-chats", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch chats");
  }

  const data = await response.json();
  return data;
};

export const deleteUserChats = async () => {
  const response = await fetch("http://localhost:5000/api/v1/chat/delete", {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to delete chats");
  }

  const data = await response.json();
  return data;
};

export const logoutUser = async () => {
  const response = await fetch("http://localhost:5000/api/v1/user/logout", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to logout");
  }

  const data = await response.json();
  return data;
};
