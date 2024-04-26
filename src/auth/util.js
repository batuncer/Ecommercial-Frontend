export const setSession = (token) => {
  if (token) {
    localStorage.setItem("jwtToken", token);
  } else {
    localStorage.removeItem("jwtToken");
  }
};

export const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, options);

  return response;
};
