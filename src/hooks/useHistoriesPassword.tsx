import Cookies from "js-cookie";

const KEY = "CABBAGE_PASSWORD_ENTER_HISTORIES";
const EXPIRES_IN_HOURS = 0.1; // 1 小時

export const useHistoriesPassword = () => {
  return {
    set: (password: string) => {
      // 取得目前的 cookie 資料
      const lists: string[] = JSON.parse(Cookies.get(KEY) || "[]");

      // 如果密碼不在列表中，則新增
      if (!lists.includes(password)) {
        lists.unshift(password);
        
        // 設定 cookie，存活時間為 1 小時
        Cookies.set(KEY, JSON.stringify(lists), { expires: EXPIRES_IN_HOURS / 24 });
      }
    },
    get: () => {
      return JSON.parse(Cookies.get(KEY) || "[]");
    },
  } as {
    set: (password: string) => void;
    get: () => string[];
  };
};
