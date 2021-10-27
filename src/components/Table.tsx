import React, { FC, Fragment } from "react";
import { Table, Fade, Button } from "react-bootstrap";
import { ICategoryTypes } from "../Types/categoryTypes";
import { IProductTypes } from "../Types/productTypes";
import { useHistory } from "react-router-dom";
interface ITablePageProps {
  name: string;
  products?: IProductTypes[] | undefined;
  categories?: ICategoryTypes[] | undefined;
}

export const TablePage: FC<ITablePageProps> = ({ products, categories, name }) => {
  let history = useHistory();

  const editCategoryHandler = (e:React.SyntheticEvent<EventTarget>) =>{
    e.preventDefault()
    if (!(e.target instanceof HTMLButtonElement)) 
      return;
    const id = e.target.dataset.categoryid
    history.push(`/editCategory/${id}`)
}

  const editProductHandler = (e:React.SyntheticEvent<EventTarget>) =>{
    e.preventDefault()
    if (!(e.target instanceof HTMLButtonElement)) 
    return;
    const id = e.target.dataset.id
    history.push(`/editProduct/${id}`)
}

  return (
      <Fade in={true} appear={true}>
        <Table striped bordered hover size="sm" style={{ textAlign: "center", backgroundColor: "#dee2e6" }} responsive >
          {name === "products" ? (
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Manage</th>
              </tr>
            </thead>
          ) : (
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Manage</th>
              </tr>
            </thead>
          )}
          {name === "products" ? (
            <tbody>
              {products &&
                products.map((el: IProductTypes, index: number) => {
                  return (
                    <Fragment key={++index}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ width: "3%", padding: "6px" }}>{++index}</td>
                        <td style={{ padding: "6px" }}>{el.name}</td>
                        <td style={{ padding: "6px" }}>{el.category_name}</td>
                        <td style={{ padding: "6px" }}>
                        <Button className="btn btn-primary btn-sm" onClick={editProductHandler}
                          data-id = {el.uniq_id}>Edit product</Button>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
            </tbody>
          ) : (
            <tbody>
              {categories &&
                categories.map((el: ICategoryTypes) => {
                  return (
                    <Fragment key={el.id}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ width: "3%", padding: "6px" }}>{el.id}</td>
                        <td style={{ padding: "6px" }}>{el.name}</td>
                        <td style={{ padding: "6px" }}>
                          <Button className="btn btn-primary btn-sm" onClick={editCategoryHandler}
                            data-categoryid = {el.category_id}>Edit Category</Button>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
            </tbody>
          )}
        </Table>
      </Fade>
    );
};
