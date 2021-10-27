import React, { useRef, useEffect, useState, FC } from "react";
import { Container, Form, Button, ListGroup, Alert, Row } from "react-bootstrap";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import { addProduct } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ICategoryTypes } from "../../Types/categoryTypes";
import { IErrorKeys, IErrorTypes } from "../../Types/errorTypes";
import { IAddProductTypes } from "../../Types/addProductTypes";
import { fetchCategoriesRequest } from "../../features/categories/utils/fetchCategoriesRequest";
import { setErrorHandler } from "../../utils/setErrorHandler";


export const AddProductPage:FC = () => {

const [errors, setErrors] = useState<IErrorKeys>({
  name: "",
  category_id: ""
})
const categoryInput = useRef<HTMLInputElement>(null);
const productNameInput = useRef<HTMLInputElement>(null);
const formWrapper = useRef<HTMLFormElement>(null)
const [searchedCategory, setSearchedCategory] = useState<ICategoryTypes[]>([]);
const [showCategoriesList, setShowCategoriesList] = useState<boolean>(false);
const [searchedCategoryError, setSearchedCategoryError] = useState<boolean>(false);
const [categoryName, setCategoryName] = useState<string>("");
const [categoryNameInputValue, setCategoryNameInputValue] = useState<string>("");

const dispatch = useAppDispatch();

const categoriesFromApi = useAppSelector<ICategoryTypes[]>(
    (state) => state.categories.categories
  );

const errorsFromApi = useAppSelector<IErrorTypes[]>(state => state.products.errors)
const status = useAppSelector<string | undefined>(state => state.products.status)
  
  useEffect(()=>{
   const errors = setErrorHandler(errorsFromApi)
    setErrors(errors)
    if(errorsFromApi.length===0){
        formWrapper.current?.reset()
        setCategoryName("")
      }
  }, [errorsFromApi])

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  useEffect(() => {
    function windowHandler(e: MouseEvent) {
 
      if (!(e.target instanceof HTMLElement)) 
      return;

      setShowCategoriesList(e.target.id=== "formCategory");
    }
    window.addEventListener("click", windowHandler)

    return () =>{
      window.removeEventListener('click', windowHandler)
    }
  }, []);

  const categoryFocusHandler = async (): Promise<void> => {
    try {
    setShowCategoriesList(true);
    setCategoryName("");
    setSearchedCategoryError(false);
    if (categoryInput.current) categoryInput.current.value = "";

      const categories = await fetchCategoriesRequest()
      setSearchedCategory(categories.data);
    } 
    catch (err) {
      setSearchedCategoryError(true);
    }
  };

  const categoryChangeHandler = async (e: any):Promise<void> => {
    try {
          setCategoryNameInputValue(e.target.value);
          setSearchedCategoryError(false);
          const categories = await fetchCategoriesRequest()

          const filteredCategories= categories.data.filter((category: ICategoryTypes) => {
              if (category.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
                  return category;
              }
          });
        setSearchedCategory(filteredCategories);
    } 
    catch (err) {
      setSearchedCategoryError(true);
    }
  };

  function getCategoryName(e:any):void {
    setCategoryName(e.target.textContent);
  }

  const addProductHandler = (e: any):void => {
    e.preventDefault();
    const searchedCategory = categoriesFromApi.filter((category) => {
      if (category.name === categoryName) return category;
    });
    const data:IAddProductTypes = {
      name: productNameInput.current?.value,
      category_id: searchedCategory[0]?.category_id,
    };
    dispatch(addProduct(data))
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="d-flex justify-content-center align-items-center mt-5 w-100">
        <Form className="col-xs-12 col-sm-12 col-md-8 col-lg-5  column col-sm-offset-0 col-md-offset-2 col-lg-offset-3" onSubmit={addProductHandler} ref={formWrapper}>
        {status==="successed" && <Alert variant="success">Success added</Alert>}
        {status==="Failed to send" && <Alert variant="danger">Sth with server</Alert>}     
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" placeholder="Enter product name" ref={productNameInput} />
                {errors.name && <Form.Text style={{color: "red"}}>{errors.name}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory" style={{ position: "relative" }}>
            <Form.Label>Product category</Form.Label>
            <Form.Control type="text" onFocus={categoryFocusHandler} value={categoryName}autoComplete="off" onChange={()=>{}} placeholder="Select category"/>
                {errors.category_id && <Form.Text style={{color: "red"}}>{errors.category_id}</Form.Text>}
            <ListGroup style={{position: "absolute", top: "110%", left: "0", width: "100%", maxHeight: "200px", overflowY: "auto"}}>
              {showCategoriesList && (<Form.Control ref={categoryInput} type="text" placeholder="Search product category" onChange={categoryChangeHandler} onFocus={categoryFocusHandler} value={categoryNameInputValue} autoComplete="off"/>)}
              {showCategoriesList && searchedCategory && searchedCategory.map((category: ICategoryTypes) => {
                  return (
                    <ListGroup.Item role="button" onClick={getCategoryName} key={category.id} 
                      data-id={category.category_id}>{category.name}</ListGroup.Item>
                  );})}
              {showCategoriesList && searchedCategory.length===0 &&  <ListGroup.Item>No found :(</ListGroup.Item>}
              {showCategoriesList && searchedCategoryError && (<ListGroup.Item>Sth went wrong :(</ListGroup.Item>)}
            </ListGroup>
          </Form.Group>
          <Form.Group>
            <div className="col-md-12 col-lg-5 m-auto">
                <Button className="w-100 mt-3" variant="primary" type="submit">Add</Button>
            </div>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};