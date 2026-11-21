export const getSavedOwnerProfile = () => {
  if (typeof window === "undefined") return null;

  try {
    const userId = window.localStorage.getItem("userId");
    if (!userId) return null;

    const name = window.localStorage.getItem("userName") || "";
    const nameParam = name ? `?name=${encodeURIComponent(name)}` : "";
    const link = `${window.location.origin}/secret/${encodeURIComponent(userId)}${nameParam}`;

    return { userId, name, link };
  } catch {
    return null;
  }
};

export const saveOwnerProfile = (userId, name) => {
  const normalizedName = name.trim();
  const nameParam = normalizedName ? `?name=${encodeURIComponent(normalizedName)}` : "";
  const link = `${window.location.origin}/secret/${encodeURIComponent(userId)}${nameParam}`;

  try {
    window.localStorage.setItem("authKey", `auth-${userId}`);
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("userName", normalizedName);
  } catch {
    // Keep the newly created link usable for this page even if storage is unavailable.
  }

  return link;
};
