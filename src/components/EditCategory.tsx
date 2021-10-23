import React, {useRef} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import {  useParams } from "react-router-dom";
import { editCategory } from '../features/categories/categoriesSlice';
import { useAppDispatch } from '../hooks';


interface IParam{
    id: string;
}
export const EditCategory = (e:any) => {
    const formCategory = useRef<HTMLFormElement>(null)
    const categoryNameInput = useRef<HTMLInputElement>(null)
    let {id} = useParams<IParam>()
    const dispatch = useAppDispatch()

console.log(id)
    const editCategoryHandler = (e:any) => {
        e.preventDefault()
        console.log(typeof parseInt(id))
        const intId = parseInt(id)
        const data = {
            id: intId,
            categoryName: categoryNameInput.current?.value
        }
    
        console.log(typeof intId)
        dispatch(editCategory(data))
    }

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center mt-5"
        style={{ width: "30%", height: "100%" }}>
            <Form className="w-100" onSubmit={editCategoryHandler} ref={formCategory}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>New category name</Form.Label>
                    <Form.Control type="text" placeholder="Enter category name" ref={categoryNameInput} />
                </Form.Group>
                <Button className="w-100 mt-3" variant="primary" type="submit">Edit</Button>
           </Form>
           </div>
        </Container>
    )
}
