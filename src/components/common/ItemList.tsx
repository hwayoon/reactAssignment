import React, {Suspense} from "react";
import {useRecoilValueLoadable} from "recoil";
import {IProduct, productsList} from "../../store/products";
import ProductsLoad from "../products/ProductsLoad";
import {MENUS} from "../../constants/category";

type TItemsProps = {
    title?: string;
    limit?: number;
    data?: Array<IProduct>;
    scroll?: boolean;
} & typeof defaultProps;

const defaultProps = {
    title: "",
    limit: 4,
    data: [],
    scroll: false,
};

const ItemList = ({title, limit, scroll}: TItemsProps): JSX.Element => {
    const ProductsList = React.lazy(()=>import("../products/ProductsList"));
    const ProductsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
    let products: IProduct[] = "hasValue" === ProductsLoadable.state? ProductsLoadable.contents : [];
    switch (title) {
        case MENUS.FASHION:
            products = products
              .filter((item)=>item.category ===  "men's clothing" || item.category === "women's clothing")
              .slice(0, limit);
            break;
        case MENUS.ACCESSORY:
            products = products.filter((item)=>item.category === "jewlery").slice(0, limit);
            break;
        case MENUS.DIGITAL:
            products = products.filter((item)=>item.category === "electronis").slice(0, limit);
            break;
        default:
            products = products;
            break;
    }
    return (
        <>
            <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list" data-scroll={scroll}>
                <Suspense fallback={<ProductsLoad limit={limit} />}>
                    <ProductsList products={products} limit={limit} />
                </Suspense>
            </div>
        </>
    );
};

ItemList.defaultProps = defaultProps;

export default ItemList;