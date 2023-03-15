async function copyLink(id) {
  await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
}

// Get the search term and page number from the query string
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("page") || 1;

const profile = (userId = "") => {
  return {
    profile: `/user/${userId}`,
    pending: "/pending",
    users: "/users",
    home: "",
  };
};

function handleNext(totalPages, isProfileUrl = false, userId) {
  const pageUrl = profile(userId)[isProfileUrl];

  if (+totalPages === +page) return;
  const newUrl = `${pageUrl}?page=${+page + 1}`;
  window.location.href = newUrl;
}

function handlePrev(isProfileUrl = false, userId) {
  const pageUrl = profile(userId)[isProfileUrl];

  if (+page <= 1) return;
  const newUrl = `${pageUrl}?page=${+page - 1}`;
  window.location.href = newUrl;
}
