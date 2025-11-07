type FilterType = {
    keyword?: string;
    [key: string]: any;
}

type ImageItem = {
    _id: string;
    public_id: string;
    url: string;
}

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    skinType: string[];
    stock: number;
    images?: ImageItem[];
}

type Shipping = {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

type OrderItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

type Order = {
    _id: string;
    createdAt: string;
    deliveredAt: string;
    itemsPrice: number;
    orderItems: OrderItem[] | Partial<OrderItem>[];
    orderStatus: string;
    paidAt: string;
    shippingPrice: number;
    shippingInfo: Shipping;
}

type CommonFilter = {
    keyword?: string;
    [key: string]: any;
}

type Addons = {
    [key: string]: any;
}

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';