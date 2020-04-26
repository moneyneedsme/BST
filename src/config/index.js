// 图片上传
export const Upload = 'https://www.bestekdirect.com/index.php?route=forum/photos/upload'
export default{
  baseUrl:'https://www.bestekdirect.com',
  imgUrl:'https://www.bestekdirect.com',
  setStorage(name,data){
    window.sessionStorage.setItem(name, data);  
  },
  getStorage(name){
    return window.sessionStorage.getItem(name);  
  },
}