import React, { useContext, useEffect, useState } from 'react';
import ChartInfo from '../ChartInfo'
import { DashboardProps, ProductData } from '../../types/index'
import Filter from '../Filter';
import styles from './TopThreeProducts.module.scss';
import BarChart from '../Charts/BarChart';
import { Context } from '../../Context';

const TopThreeProducts: React.FC<DashboardProps> = ({ orders }) => {

    const { getUniqueValues } = useContext(Context);

    const [chartData, setChartData] = useState<ProductData[]>([])
    const [filter, setFilter] = useState<string>("currency");

    useEffect(() => {
        const products = getProductData();
        const topThree = getTopThreeProducts(products);
        setChartData(topThree);
    }, [filter])

    const getTopThreeProducts = (products: ProductData[]) => {
        if (filter === "currency") {
            const topThree = products.sort((a, b) => (b.currency - a.currency)).slice(0, 3);

            return topThree;
        } else {
            const topThree = products.sort((a, b) => (b.quantity - a.quantity)).slice(0, 3);

            return topThree;
        }
    }

    const getProductData = () => {
        const productNames = orders.map(order => order.productName);
        const uniqueNames = getUniqueValues(productNames);

        const productData: ProductData[] = uniqueNames.map(name => {
            //Get orders of the same products
            const sameProduct = orders.filter(order => order.productName === name);

            //Get the total amount of the order and add them
            const totalCurrency = sameProduct.map(order => (Number(order.quantity) * Number(order.price)));
            const totalCurrencyFromProduct = totalCurrency.reduce((acc, curr) => acc += curr);
            //Get the total cuantity and add them
            const totalQuantity = sameProduct.map(order => Number(order.quantity));
            const totalQuantityFromProduct = totalQuantity.reduce((acc, curr) => acc += curr);

            return {
                product: name,
                currency: Math.ceil(totalCurrencyFromProduct),
                quantity: totalQuantityFromProduct
            };
        })

        return productData;
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFilter(value);
    }

    const renderFilter = () => {
        const filter = ["currency", "quantity"];

        return (
            <Filter name={"filter"} values={filter} changeHadler={handleFilterChange} />
        );
    }

    return (
        <div className={styles.container}>
            <ChartInfo chartTitle="Top Three Products" filters={renderFilter} />
            <div className={styles.wrapper}>
                <BarChart data={chartData} filter={filter} />
            </div>
        </div>
    );
}

export default TopThreeProducts;
