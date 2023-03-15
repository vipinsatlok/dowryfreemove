// delete post
async function deletePost(id) {
  const data = await fetch(`/post/${id}`, { method: "DELETE" });
  const isDelete = await data.json();

  if (isDelete.success) {
    location.reload();
  } else {
    location.href = "/";
  }
}

// delete post
async function deleteUser(id) {
  const data = await fetch(`/user/${id}`, { method: "DELETE" });
  const isDelete = await data.json();

  if (isDelete.success) {
    location.reload();
  } else {
    location.href = "/users";
  }
}

// like post
async function likePosts(id, userId) {
  if (!userId) return (location.href = "/auth/google");

  const data = await fetch(`/post/like/${id}`, { method: "PUT" });
  const isLiked = await data.json();

  if (isLiked.success) {
    const likeTag = document.getElementById(`${id}-like`);
    const svgTag = document.getElementById(`${id}-thumb`);
    likeTag.innerText = +likeTag.innerText + +isLiked.like;
    if (isLiked.like == 1) {
      svgTag.style.fill = "white";
    } else {
      svgTag.style.fill = "none";
    }
  } else {
    location.href = "/";
  }
}

const addButton = document.querySelector("button.add");
const updateButton = document.querySelector("button.update");

if (addButton) {
  addButton.onclick = addPost;
}

if (updateButton) {
  updateButton.onclick = updatePost;
}

// add post
function addPost(e) {
  e.preventDefault();

  addButton.innerText = "Uploading...";
  addButton.classList.replace("bg-blue-700", "bg-blue-400");
  addButton.classList.add("pointer-events-none");

  // Get data from DOM
  const he = document.getElementById("he").value;
  const she = document.getElementById("she").value;
  const state = document.getElementById("state").value;
  const district = document.getElementById("district").value;
  const date = document.getElementById("date").value;
  const image = document.getElementById("image");
  const verified = document.getElementById("verified").checked;

  // Convert image to base64
  const file = image.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    const base64Image = reader.result.split(",")[1];

    // Create data object
    const data = {
      he,
      she,
      state,
      district,
      date,
      image: base64Image,
      verified,
    };

    // Send data as JSON using fetch
    const url = "/post";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    sendData(url, options, "/add");
  };
}

// update posts
function updatePost(e) {
  e.preventDefault();

  updateButton.innerText = "Updating...";
  updateButton.classList.replace("bg-blue-700", "bg-blue-400");
  updateButton.classList.add("pointer-events-none");
  const id = location.pathname.split("update/")[1];

  // Get data from DOM
  const he = document.getElementById("he").value;
  const she = document.getElementById("she").value;
  const state = document.getElementById("state").value;
  const district = document.getElementById("district").value;
  const date = document.getElementById("date").value;
  const verified = document.getElementById("verified").checked;

  // Create data object
  const data = {
    he,
    she,
    state,
    district,
    date,
    verified,
  };

  // Send data as JSON using fetch
  const url = `/post/${id}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  sendData(url, options, `/update/${id}`);
}

// send data to server
async function sendData(url, options, path) {
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (responseData.success) return (location.href = "/");
  return (location.href = path);
}
