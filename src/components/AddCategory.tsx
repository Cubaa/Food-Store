import React, {useRef} from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import { addCategory } from '../features/categories/categoriesSlice'
import { useAppDispatch } from '../hooks'

export const AddCategory = () => {
const formCategory = useRef<HTMLFormElement>(null)
const categoryNameInput = useRef<HTMLInputElement>(null)
const dispatch = useAppDispatch()

const addCategoryHandler = (e:any) =>{
e.preventDefault()
const data ={
    name: categoryNameInput.current?.value
}
dispatch(addCategory(data))
}

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center mt-5"
        style={{ width: "30%", height: "100%" }}>
            <Form className="w-100" onSubmit={addCategoryHandler} ref={formCategory}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Category name</Form.Label>
                    <Form.Control type="text" placeholder="Enter category name" ref={categoryNameInput} />
                </Form.Group>
                <Button className="w-100 mt-3" variant="primary" type="submit">Add</Button>
           </Form>
           </div>
        </Container>
    )
}
