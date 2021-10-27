import React, {FC, useEffect, useRef} from 'react'
import { Container, Form, Button, Alert, Row} from 'react-bootstrap'
import { addCategory } from '../../features/categories/categoriesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { IErrorTypes } from '../../Types/errorTypes'
import { IAddCategoryTypes } from '../../Types/addCategoryTypes'

export const AddCategoryPage:FC = () => {

const categoryNameInput = useRef<HTMLInputElement>(null)
const formWrapper = useRef<HTMLFormElement>(null)
const dispatch = useAppDispatch()

const errorsFromApi = useAppSelector<IErrorTypes[]>(state => state.categories.errors)
const status = useAppSelector<string | undefined>(state => state.categories.status)

const addCategoryHandler = (e:React.FormEvent<HTMLFormElement>):void =>{
e.preventDefault()
const data:IAddCategoryTypes ={
    name: categoryNameInput.current?.value
}
dispatch(addCategory(data))
}

useEffect(()=>{
    if(errorsFromApi.length===0){
        formWrapper.current?.reset()
    }
}, [addCategoryHandler, errorsFromApi.length])


    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row className="d-flex justify-content-center align-items-center mt-5 w-100">
            <Form className="col-xs-12 col-sm-12 col-md-8 col-lg-6  column col-sm-offset-0 col-md-offset-2 col-lg-offset-3" onSubmit={addCategoryHandler} ref={formWrapper}>
            {status==="succeeded" && <Alert variant="success">Success added</Alert>}
            {status==="Failed to send" && <Alert variant="danger">Sth with server</Alert>}
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Category name</Form.Label>
                    <Form.Control type="text" placeholder="Enter category name" ref={categoryNameInput}/>
                    {errorsFromApi.length >0 ? <Form.Text style={{color: "red"}}>{errorsFromApi[0].message}</Form.Text> : null}
                </Form.Group>
                <Form.Group>
                    <div className="col-md-12 col-lg-5 m-auto">
                        <Button className="w-100 mt-3" variant="primary" type="submit">Add</Button>
                    </div>
                </Form.Group>
           </Form>
           </Row>
        </Container>
    )
}
