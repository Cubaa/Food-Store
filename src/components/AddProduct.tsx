import React, {useRef, useEffect, useState} from "react";
import { Container, Form, Button, ListGroup, ListGroupItem  } from "react-bootstrap";
import ReactDOM from "react-dom";
import { isCatchClause } from "typescript";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { ICategory } from "../Types/categoryTypes";
import { sendRequest } from "../utils/sendRequest";


export const AddProduct = () => {
  const listContainer = useRef<HTMLDivElement>(null)
  const categoryInput = useRef<HTMLInputElement>(null)
  const listGroups = useRef<any>(null)
  const [searchedCategory, setSearchedCategory] = useState<ICategory[]>([])
  const [showCategoriesList, setShowCategoriesList] = useState<boolean>(false)
  const [searchedCategoryError, setShowCategoryError] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>("")

useEffect(()=>{
  function windowHandler(e:any){
      setShowCategoriesList(e.target.id==="formCategory")
  }
  window.onclick = windowHandler
}, [window])

  const categoryFocusHandler = async () =>{
    setShowCategoriesList(true)
    setCategoryName("")
    setShowCategoryError(false)
    if(categoryInput.current)
      categoryInput.current.value = ""
      
      try{
    const categories = await sendRequest({
      url: "https://newdemostock.gopos.pl/ajax/219/product_categories",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
      },
    })
   
  setSearchedCategory(categories)
      }
      catch(err){
        setShowCategoryError(true)
      }
  
 
      
  }

  const categoryChangeHandler = async (e:any) =>{
    setCategoryName(e.target.value)
    setShowCategoryError(false)
    try{
    const categories = await sendRequest({
      url: "https://newdemostock.gopos.pl/ajax/219/product_categories",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
      },
    })

    const searchingCategory = categories.filter((category: ICategory)=>{
      if(category.name.toLocaleLowerCase().includes((e.target.value).toLocaleLowerCase())){
        console.log(category.name)
        return category
      }
      
     })
  console.log(searchingCategory)
  setSearchedCategory(searchingCategory)
 
    }
    catch(err){
      setShowCategoryError(true)
    }
  }
  function a(e:any){
    console.log(e.target)
    console.log("klik")
    setCategoryName(e.target.textContent)
    
  }
  
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div
        className="d-flex justify-content-center align-items-center mt-5"
        style={{ width: "30%", height: "100%" }}
      >
        <Form className="w-100">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" placeholder="Enter product name" />
          </Form.Group>

          

          <Form.Group className="mb-3" controlId="formCategory" style={{position: "relative"}}>
            <Form.Label>Product Category</Form.Label>
            <Form.Control ref={categoryInput} type="text" placeholder="Search product category" onChange={categoryChangeHandler} onFocus={categoryFocusHandler} value={categoryName} />
            <ListGroup ref={listContainer} style={{position: "absolute", top: "110%", left: "0", width: "100%", maxHeight: "200px", overflowY: "auto"}}>
               
              {showCategoriesList && searchedCategory && searchedCategory.map((category:ICategory, index: number)=>{
                  return <ListGroup.Item onClick = {a} key={category.id} style={{cursor: "pointer"}}>{category.name}</ListGroup.Item> 
              })
              }
              {showCategoriesList && searchedCategoryError && <ListGroup.Item>Sth went wrong :(</ListGroup.Item> }
            </ListGroup>
          </Form.Group>
          <Button className="w-50" variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </div>
    </Container>
  );
};



// const categoryChangeHandler = async (e:any) =>{
//   console.log(e.target.value)
//   console.log(listContainer.current)
//   try{
//   const res = await fetch('https://newdemostock.gopos.pl/ajax/219/product_categories', {
//     headers: {
//       "Content-Type": "application/json",
//      "Authorization": "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
//     },
//   })
//   const categories = await res.json()
//   if(e.target.value===""){
//     console.log("tu")
//     setSearchedCategory(categories.data)
//   }
  
//   const searchingCategory = categories.data.filter((category: ICategory)=>{
//     if(category.name.toLocaleLowerCase().includes((e.target.value).toLocaleLowerCase())){
//       console.log(category.name)
//       return category
//     }
    
//    })
// console.log(searchingCategory)
// setSearchedCategory(searchingCategory)
//   }
//   catch(err){
//     console.log(err)
//     setShowCategoryError(true)
//   }


// }


// function a(e:any){
  //   console.log(e.target)
  //   console.log("klik")
  //   setCategoryName(e.target.textContent)
    
  // }
  // if(listContainer.current){
   
  //   [...listContainer.current.children].forEach((item:any)=>{
  //     console.log(item)
  //     item.onclick = a;
  //   })
  // }