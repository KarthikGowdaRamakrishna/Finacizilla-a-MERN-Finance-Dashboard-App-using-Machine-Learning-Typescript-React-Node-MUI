export interface ExpensesByCategory{
    salaries: number;
    supplier: number;
    services: number;
}
export interface Month{
    id: string;
    month: string;
    expenses: number;
    revenue: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
}

export interface Day{
    id: string;
    date: string;
    expenses: number;
    revenue: number;
}


export interface GetKpisResponse{
    id:string;
    _id: string;
    __v: number;
    totalProfit: number;
    
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
    createdAt: string;
    updatedAt: string;
}

export interface GetProductsResponse{
    id:string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}


export interface GetTransactionsResponse{
    id:string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
}