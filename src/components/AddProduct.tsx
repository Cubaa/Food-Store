import React, { useRef, useEffect, useState } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { addProduct } from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICategory } from "../Types/categoryTypes";
import { IErrorKeys, IErrorTypes } from "../Types/errorTypes";
import { ISendDataproductTypes } from "../Types/sendDataProductTypes";
import { sendRequest } from "../utils/sendRequest";
import '../index.css'





export const AddProduct = () => {
const [sendErrors, setSendErrors] = useState<IErrorKeys>({
  name: "",
  category_id: ""
})
const listContainer = useRef<HTMLDivElement>(null);
const categoryInput = useRef<HTMLInputElement>(null);
const productNameInput = useRef<HTMLInputElement>(null);
const [searchedCategory, setSearchedCategory] = useState<ICategory[]>([]);
const [showCategoriesList, setShowCategoriesList] = useState<boolean>(false);
const [searchedCategoryError, setShowCategoryError] = useState<boolean>(false);
const [categoryName, setCategoryName] = useState<string>("");
const [categoryNameInputValue, setCategoryNameInputValue] = useState<string>("");
const [productData, setProductData] = useState<ISendDataproductTypes>();
const formWrapper = useRef<HTMLFormElement>(null);

const dispatch = useAppDispatch();

const categoriesFromApi = useAppSelector<ICategory[]>(
    (state) => state.categories.categories
  );

const errorsFromApi = useAppSelector<IErrorTypes[]>(state => state.products.sendProductError)
  
  
  useEffect(()=>{
  
    const errors:IErrorKeys = {
      name:"",
      category_id: ""
    }

    for(let key in sendErrors){
      for(let i=0; i<errorsFromApi.length; i++)
      if(key==="name" && errorsFromApi[i].field==="name")
      errors['name'] = errorsFromApi[i].message
      else if(key==="category_id" && errorsFromApi[i].field==="category_id") {
        errors['category_id'] = errorsFromApi[i].message
      }
    setSendErrors(errors)
    
  }}, [errorsFromApi])

  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    function windowHandler(e: any) {
      setShowCategoriesList(e.target.id === "formCategory");
    }
    window.onclick = windowHandler;
  }, [window]);

  const categoryFocusHandler = async () => {
    setShowCategoriesList(true);
    setCategoryName("");
    setShowCategoryError(false);
    if (categoryInput.current) categoryInput.current.value = "";

    try {
      const categories = await sendRequest({
        url: "https://newdemostock.gopos.pl/ajax/219/product_categories",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
        },
      });

      setSearchedCategory(categories);
    } catch (err) {
      setShowCategoryError(true);
    }
  };

  const categoryChangeHandler = async (e: any) => {
    setCategoryNameInputValue(e.target.value);
    setShowCategoryError(false);
    try {
      const categories = await sendRequest({
        url: "https://newdemostock.gopos.pl/ajax/219/product_categories",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "fd9ba9e1-0788-4e8f-ac46-a43df43e205e",
        },
      });

      const searchingCategory = categories.filter((category: ICategory) => {
        if (
          category.name
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase())
        ) {
          console.log(category.name);
          return category;
        }
      });
      console.log(searchingCategory);
      setSearchedCategory(searchingCategory);
    } catch (err) {
      setShowCategoryError(true);
    }
  };
  function a(e: any) {
    console.log(e.target);
    console.log("klik");
    setCategoryName(e.target.textContent);
  }
  const addProductHandler = (e: any) => {
    e.preventDefault();

    console.log(categoryName, productNameInput.current?.value);

    const searchedCategory = categoriesFromApi.filter((category) => {
      if (category.name === categoryName) return category;
    });

    const data = {
      name: productNameInput.current?.value,
      category_id: searchedCategory[0]?.category_id,
    };
    console.log(productData);
    const res = dispatch(addProduct(data));
    console.log(res)
  };



  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div
        className="d-flex justify-content-center align-items-center mt-5"
        style={{ width: "30%", height: "100%" }}
      >
        <Form className="w-100" onSubmit={addProductHandler} ref={formWrapper}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" placeholder="Enter product name" ref={productNameInput}
            />
                {sendErrors.name && <Form.Text className="text-muted warn">
                  {sendErrors.name}
                </Form.Text>}

          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory" style={{ position: "relative" }}>
            <Form.Label>Product Category</Form.Label>
            <Form.Control type="text" onFocus={categoryFocusHandler} value={categoryName}autoComplete="off" onChange={()=>{}}/>
                    {sendErrors.category_id && <Form.Text className="text-muted warn">
                      {sendErrors.category_id}
                  </Form.Text>}

            <ListGroup ref={listContainer} style={{position: "absolute", top: "110%", left: "0", width: "100%", maxHeight: "200px", overflowY: "auto"}}>
              {showCategoriesList && (
                <Form.Control ref={categoryInput} type="text" placeholder="Search product category"
                  onChange={categoryChangeHandler} onFocus={categoryFocusHandler} value={categoryNameInputValue} autoComplete="off"/>
              )}
              {showCategoriesList &&
                searchedCategory &&
                searchedCategory.map((category: ICategory, index: number) => {
                  return (
                    <ListGroup.Item onClick={a} key={category.id} style={{ cursor: "pointer" }}
                      data-id={category.category_id}>
                      {category.name}
                    </ListGroup.Item>
                  );
                })}
              {showCategoriesList && searchedCategoryError && (
                <ListGroup.Item>Sth went wrong :(</ListGroup.Item>
              )}
            </ListGroup>
          </Form.Group>
          <Button className="w-100 mt-3" variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </div>
    </Container>
  );
};