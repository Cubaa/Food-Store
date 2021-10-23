import React, { FC, Fragment, memo, useMemo } from "react";
import { Table, Fade, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ICategory } from "../Types/categoryTypes";
import { IFetchDataproductTypes } from "../Types/fetchDataProductTypes";
import { useHistory, useParams } from "react-router-dom";



interface ITablePageProps {
  name: string;
  products?: IFetchDataproductTypes[] | undefined;
  categories?: ICategory[] | undefined;
}



const TablePage: FC<ITablePageProps> = ({ products, categories, name }) => {
  let history = useHistory();
 
  
const editCategoryHandler = (e:any) =>{
  e.preventDefault()
  console.log(e.target.dataset.categoryid)
  const id = e.target.dataset.categoryid
  console.log(id)
history.push(`/editCategory/${id}`)
}

  console.log("TABLE PAGE");
  const x = useMemo(() => {
    return (
      <Fade in={true} appear={true}>
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ textAlign: "center", backgroundColor: "#dee2e6" }}
        >
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
                products.map((el: IFetchDataproductTypes) => {
                  return (
                    <Fragment key={el.id}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ width: "3%", padding: "6px" }}>{el.id}</td>
                        <td style={{ padding: "6px" }}>{el.name}</td>
                        <td style={{ padding: "6px" }}>{el.category_name}</td>
                        <td style={{ padding: "6px" }}>
                          <Link
                            className="btn btn-primary btn-sm"
                            role="button"
                            to="/edit"
                          >
                            Edit Product
                          </Link>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
            </tbody>
          ) : (
            <tbody>
              {categories &&
                categories.map((el: ICategory) => {
                  return (
                    <Fragment key={el.id}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ width: "3%", padding: "6px" }}>{el.id}</td>
                        <td style={{ padding: "6px" }}>{el.name}</td>
                        <td style={{ padding: "6px" }}>
                          <Button
                            className="btn btn-primary btn-sm"
                            onClick={editCategoryHandler}
                            data-categoryid = {el.category_id}
                          >
                            Edit Category
                          </Button>
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
  }, []);
  return x;
};

export default memo(TablePage);
