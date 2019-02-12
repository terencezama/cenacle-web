const getItem = key => {
  let sitem = localStorage.getItem(key);
  
  
  if (!sitem) return null;
  sitem = JSON.parse(sitem);
  console.log("reqyest>>>", key, sitem, sitem.type, sitem.value);
//   if (sitem.type === "boolean") {
//     if (sitem.value === "false") {
//       return false;
//     } else if (sitem.value === "true") {
//       return true;
//     }
//     // return sitem.value;
//   } else {
//     return sitem.value;
//   }
  return sitem.value;
  // const decoded = JSON.parse(defaultValue);
  // return decoded?decoded:defaultValue;
};
const setItem = (key, item) => {
  
  const data = {
    type: typeof item,
    value: item
  };
  console.log("typeof",key, data, JSON.stringify(data));
  localStorage.setItem(key, JSON.stringify(data));
};
export default {
  getItem,
  setItem
};
