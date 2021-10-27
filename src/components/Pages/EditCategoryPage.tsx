import React, {FC, ReactType, useEffect, useRef} from 'react'
import { Container, Form, Button, Alert, Row } from 'react-bootstrap'
import {  useParams } from "react-router-dom";
import { editCategory, resetCategoriesErrors } from '../../features/categories/categoriesSlice';
import { resetProductsErrors } from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IEditCategoryTypes } from '../../Types/editCategoryTypes';
import { IErrorTypes } from '../../Types/errorTypes';

interface IParam{
    id: string;
}

export const EditCategoryPage:FC = () => {
    let {id} = useParams<IParam>()
    const categoryNameInput = useRef<HTMLInputElement>(null)
    const formWrapper = useRef<HTMLFormElement>(null)
    const dispatch = useAppDispatch()
    const errorsFromApi = useAppSelector<IErrorTypes[]>(state => state.categories.errors)
    const status = useAppSelector<string | undefined>(state => state.categories.status)

    useEffect(() => {
        dispatch(resetProductsErrors())
        dispatch(resetCategoriesErrors())
    }, [dispatch])

    const editCategoryHandler = (e:React.FormEvent):void => {
        e.preventDefault()
        const intId = parseInt(id)
        const data:IEditCategoryTypes = {
            id: intId,
            name: categoryNameInput.current?.value
        }
        dispatch(editCategory(data))
    }

    useEffect(()=>{
        if(errorsFromApi.length===0){
            formWrapper.current?.reset()
          }
    }, [editCategoryHandler, errorsFromApi.length])

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row className="d-flex justify-content-center align-items-center mt-5 w-100">
                <Form className="col-xs-12 col-sm-12 col-md-8 col-lg-5  column col-sm-offset-0 col-md-offset-2 col-lg-offset-3" onSubmit={editCategoryHandler} ref={formWrapper} >
                    {status==="successed" && <Alert variant="success">Successed edited</Alert>}
                    {status==="Failed to send" && <Alert variant="danger">Something with server</Alert>}
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>New category name</Form.Label>
                        <Form.Control type="text" placeholder="Enter category name" ref={categoryNameInput} />
                        {errorsFromApi.length>0 ? <Form.Text style={{color: "red"}}>{errorsFromApi[0].message}</Form.Text> : null}
                    </Form.Group>
                    <Form.Group>
                    <div className="col-md-12 col-lg-5 m-auto">
                        <Button className="w-100 mt-3" variant="primary" type="submit">Edit</Button>
                    </div>
                    </Form.Group>      
                </Form>
           </Row>
        </Container>
    )
}
