import { ICategoryTypes } from "../Types/categoryTypes";
import { IProductTypes } from "../Types/productTypes";

export const getProductsHandler = (productsFromApi:IProductTypes[], categoriesFromApi:ICategoryTypes[]):IProductTypes[] =>{

    const products: IProductTypes[] = [];
    productsFromApi.filter((product) => {
            categoriesFromApi.filter((category) => {
                    if (category.category_id === product.category_id){
                        products.push({ ...product, category_name: category.name });
                    }
                });
    });
  return products;
}