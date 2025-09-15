export interface Purchase {
  id: string;
  productName: string;
  buyerName: string;
  price: number;
  status: 'pending' | 'completed' | 'cancelled';
  purchaseDate: string; // date ISO
}