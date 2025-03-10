const KEY = "CABBAGE_PASSWORD_ENTER_HISTORIES";

export const useHistoriesPassword = () => {
  return {
    set: (password: string) => {
      // Get the existing list from localStorage, parse it as an array or initialize it as an empty array
      const lists = JSON.parse(localStorage.getItem(KEY) || "[]");

      // Check if the password is already in the list
      if (!lists.includes(password)) {
        // Add the new password to the front of the list
        lists.unshift(password);
        // Save the updated list back to localStorage
        localStorage.setItem(KEY, JSON.stringify(lists));
      }
    },
    get: () => {
      // Retrieve the array from localStorage and parse it, return an empty array if not available
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    },
  } as {
    set: (password: string) => void;
    get: () => string[];
  };
};
