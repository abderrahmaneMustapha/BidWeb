interface IBaseRepository<T> {
  list(): Promise<T[]>;
  get(id: string): Promise<T>;
  create(entity: T): Promise<boolean>;
  delete(entity: T): Promise<boolean>;
  update(entity: T): Promise<boolean>;
}

export default IBaseRepository