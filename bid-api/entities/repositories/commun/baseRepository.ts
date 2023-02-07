interface IBaseRepository<T> {
    list(
        limit: number,
        skip: number,
        search: string,
        sort: 1 | -1,
        open: 1 | -1 | 0
    ): Promise<T[]>;
    get(id: string): Promise<T>;
    create(entity: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    update(id: string, entity: T): Promise<boolean>;
}

export default IBaseRepository;
