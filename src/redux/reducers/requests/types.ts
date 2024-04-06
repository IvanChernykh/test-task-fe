export interface IRequestsState {}

export type RequestType = 'order' | 'delivery';

export enum ParcelTypes {
  gadgets = 'Gadgets',
  drinks = 'Drinks',
  clothes = 'Clothes',
  medicines = 'Medicines',
  other = 'Other',
}

export interface IRequest {
  id: string;
  createdByUser: string; // user id
  type: RequestType;
  description?: string;
  dispatchDate: string;
  cityFrom: string;
  cityTo: string;
  typeofParcel?: ParcelTypes;
}
