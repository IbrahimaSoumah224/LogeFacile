export interface Location {
    id: string,
    address: string,
    description: string,
    price: number,
    status: 'available' | 'rented' | 'unavailable',
    createdAt: string
}