import React, { FC, Fragment, memo, useMemo } from "react";
import { Table, Fade } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ICategory } from "../Types/categoryTypes";
import { IProduct } from "../Types/productTypes";

interface ITablePageProps {
  data: IProduct[] | ICategory[];
  name: string;
}

const TablePage: FC<ITablePageProps> = ({ data, name }) => {
    console.log("TABLE PAGE")
    const x = useMemo(()=>{
  return (
    <Fade in={true} appear={true}>
      <Table striped bordered hover size="sm" style={{ textAlign: "center", backgroundColor: "#dee2e6"}}>
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
            {data.map((el: any) => {
              return (
                <Fragment key={el.id}>
                  <tr style={{ verticalAlign: "middle" }}>
                    <td style={{ width: "3%", padding: "6px"}}>{el.id}</td>
                    <td style={{ padding: "6px"}}>{el.name}</td>
                    <td style={{ padding: "6px"}}>{el.category_name}</td>
                    <td style={{ padding: "6px"}}>
                      <Link className="btn btn-primary btn-sm" role="button" to="/edit">Edit Product</Link>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            {data.map((el: any) => {
              return (
                <Fragment key={el.id}>
                  <tr style={{ verticalAlign: "middle" }}>
                    <td style={{ width: "3%",padding: "6px" }}>{el.id}</td>
                    <td style={{ padding: "6px"}}>{el.name}</td>
                    <td style={{padding: "6px"}}>
                      <Link className="btn btn-primary btn-sm" role="button" to="/edit">
                        Edit Category
                      </Link>
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
}, [])
return x;
};

export default memo(TablePage);
