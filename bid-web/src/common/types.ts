/* Types */
interface ItemFormValues {
    name: string;
    close_at: string;
    image: string;
    description: string;
}
interface Item {
    name: string;
    description: string;
    image: string;
    highest_bid: number;
    close_at: number;
    created_by: User;
    created_at: number;
    updated_at: number;
}
interface AutoBid {
    amount: number;
    percentage: number;
    items: string[];
}
interface User {
    username: string;
    password: string;
    is_admin: boolean;
    created_at: number;
    updated_at: number;
    autoBid: AutoBid;
}

/*  Props */
interface CardProps {
    to: string;
    item: Item;
}
interface ItemFormProps {
    onSubmit: (event: ItemFormValues) => void;
    leave: string;
    item?: Item;
    action: string;
}
interface AlertProps {
    type: string;
    message: string;
}
interface FormMessageProps {
    type: string;
    message: string;
}
interface usePaginationProps {
    totalCount: number;
    pageSize: number;
    siblingCount: undefined | number;
    currentPage: number;
}

interface PaginationProps {
    onPageChange: (page: number | string) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
}

interface handleBillProps {
    data: any;
    handleBill: (itemBill: any) => void
}

export type {
    ItemFormProps,
    ItemFormValues,
    AlertProps,
    FormMessageProps,
    usePaginationProps,
    PaginationProps,
    CardProps,
    Item,
    User,
    handleBillProps
};
