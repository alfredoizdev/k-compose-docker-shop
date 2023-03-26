import { Schema, model, Model, Document } from 'mongoose';

interface IOrderAttrs {
  user: string;
  orderItems: any[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

interface IOrderModel extends Model<IOrderDoc> {
  build(attrs: IOrderAttrs): IOrderDoc;
}

interface IOrderDoc extends Document {
  user: string;
  orderItems: any[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    numberOfItems: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

orderSchema.statics.build = (attrs: IOrderAttrs) => {
  return new Order(attrs);
};

const Order = model<IOrderDoc, IOrderModel>('Order', orderSchema);

export { Order };
