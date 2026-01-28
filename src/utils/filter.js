// 將數字轉換為千位分隔符格式
export const currency = (num) => {
  const n = Number(num) || 0;
  return n.toLocaleString();
};

// 如果需要固定顯示小數點後 2 位（即使數字本身沒有小數），可以使用 `minimumFractionDigits`
// n.toLocaleString("zh-TW", { minimumFractionDigits: 2 })