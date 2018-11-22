const getItem = (item)=>{
    const defaultValue = localStorage.getItem(item);
    const decoded = JSON.parse(defaultValue);
    return decoded?decoded:defaultValue;
} 
const setItem = (key,item)=>{
    localStorage.setItem(key,JSON.stringify(item));
}
export default{
    getItem,
    setItem
    
}