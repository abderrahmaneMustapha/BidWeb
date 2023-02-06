interface IBaseRepository<T> {
  list(limit: number, skip: number): Promise<T[]>;
  get(id: string): Promise<T>;
  create(entity: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  update(entity: T): Promise<boolean>;
}

export default IBaseRepository