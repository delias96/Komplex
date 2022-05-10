import * as mongoose from 'mongoose';

interface DocumentPackage extends mongoose.Document {
  trackingNumber:string;
  senderName: string;
  senderPostalCode: string;
  senderCity: string;
  senderAddress: string;
  senderTelephone: string;
  senderEmail: string;
  receiverName:string;
  receiverPostalCode:string;
  receiverCity:string;
  receiverAddress:string;
  receiverTelephone:string;
  receiverEmail:string;
  packageDescription:string;
  packageWeight:number;
  packageWidth:number;
  packageLength:number;
  packageHeight:number;
  userId: string;
  createdAt: Date;
  stornedAt: number;
}

const Schema = mongoose.Schema;

const packageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  trackingNumber: { type: String, required: true },
  senderName: { type: String, required: true },
  senderPostalCode: { type: String, required: true },
  senderCity:{ type: String, required: true },
  senderAddress:{ type: String, required: true },
  senderTelephone:{ type: String, required: true },
  senderEmail:{ type: String, required: true },
  receiverName: { type: String, required: true },
  receiverPostalCode: { type: String, required: true },
  receiverCity:{ type: String, required: true },
  receiverAddress:{ type: String, required: true },
  receiverTelephone:{ type: String, required: true },
  receiverEmail:{ type: String },
  packageDescription:{type:String, required:true},
  packageWeight:{type:Number, required:true},
  packageWidth:{type:Number, required:true},
  packageLength:{type:Number,required:true},
  packageHeight:{type:Number, required:true},
  userId:{type:Schema.Types.ObjectId,required:true},
  createdAt:{
    type:Date,
    default: Date.now,
  },
  stornedAt:{ type:Date, default:null }
});

const packages = mongoose.model<DocumentPackage>('Package', packageSchema);

export {packages};





