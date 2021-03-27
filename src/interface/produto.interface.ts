export interface ProdutoInterface {
  readonly id: number;
  description: string;
  price: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
