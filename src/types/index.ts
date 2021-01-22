import { type } from "os"

export type Order = {
    supplier: string;
    productId: string,
    productName: string;
    productCategory1: string;
    productCategory2: string;
    orderedOn: string;
    price: string;
    quantity: string | number;
    deliveryDate: string
}

// Shape of Dashboard Props
export interface DashboardProps {
    orders: Order[]
}

// Shape of Line chart point
interface DataPoint {
    x: number | string | Date
    y: number | string | Date
}

// Type for Line chart Data
export type LineChartData = {
    id: string | number
    data: DataPoint[]
}

export type MarginObject = {
    [P: string]: [number, number]
}

export type ProductData = {
    product: string,
    currency: number,
    quantity: number
}