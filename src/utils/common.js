export const setUserLanguage = (lang) =>{
	localStorage.setItem('language', lang);
  }
  
  export const getUserLanguage = () =>{
	return localStorage.getItem('language');
  }