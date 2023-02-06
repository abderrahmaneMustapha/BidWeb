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
    close_at: number;
    created_by: User;
}
interface User {
    username: string;
    password: string;
    is_admin: boolean;
}
interface ItemFormProps {
    onSubmit: (event: ItemFormValues) => void;
    leave: string;
    item?: Item;
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

export type {
    ItemFormProps,
    ItemFormValues,
    AlertProps,
    FormMessageProps,
    usePaginationProps,
    PaginationProps,
};
