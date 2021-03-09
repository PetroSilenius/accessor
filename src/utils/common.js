export const setUserLanguage = (lang) =>{
	localStorage.setItem('language', lang);
  }
  
  export const getUserLanguage = () =>{
	return localStorage.getItem('language');
  }

  export const formatLanguage = (lang) => {
    if(lang){
      if(lang.includes("-")){
        var l = lang.split("-")
        return l[0]
      }
    }
    return lang
  }