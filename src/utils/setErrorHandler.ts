import { IErrorKeys, IErrorTypes } from "../Types/errorTypes"

export const setErrorHandler = ( errorsFromApi:IErrorTypes[]):IErrorKeys =>{
    const errors:IErrorKeys = {
        name:"",
        category_id: ""
      }
    for(let key in errors){
        for(let i=0; i<errorsFromApi.length; i++)
          if(key==="name" && errorsFromApi[i].field==="name"){
            errors['name'] = errorsFromApi[i].message
          }else if(key==="category_id" && errorsFromApi[i].field==="category_id") {
            errors['category_id'] = errorsFromApi[i].message
          }
    }
return errors
}