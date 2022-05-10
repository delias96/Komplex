import mongoose from "mongoose";
import { packages } from "./entity/Package";
import { User } from "./entity/User";
import { labelrender } from "./label/generateLabel";

export function dbConnect() {
  const mongoDB =
    "mongodb+srv://test:test@node.ounhd.mongodb.net/Komplex?retryWrites=true&w=majority";
  return mongoose.connect(mongoDB);
}

export const newUser = async (user: any) => {
  user._id = new mongoose.Types.ObjectId();
  let newUser = new User(user);
  await newUser.save();
};

export const getPackegesByUserId = async (id:string) => {
  const result = await packages.find({userId:id,stornedAt:null});
  return result;
};
export const getUsers = async () => {
  const result = await User.find();
  return result;
};

export const getUserById = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

export const newPackage = async (parcel: any) => {
  parcel._id = new mongoose.Types.ObjectId();
  parcel.trackingNumber = await generateTrackingNumber();
  console.log(parcel.trackingNumber);
  const newParcel = new packages(parcel);
  await newParcel.save();
};

const generateTrackingNumber = async () => {
  const lastPackage = await packages.findOne({
    sort: { createdAt: 1 },
  });

  if (!lastPackage) {
    return "ngcs-1";
  }

  return "ngcs-" + (parseInt(lastPackage.trackingNumber.split("-")[1]) + 1);
};

export const updateUserById = async (userObject: any) => {
  const result = await User.findById(userObject.id);
  if (!result) {
    return new Error("No User");
  } else {
    result.name = userObject.name;
    result.postalCode = userObject.postalCode;
    result.city = userObject.city;
    result.address = userObject.address;
    result.telephone = userObject.telephone;
    result.email = userObject.email;
    result.role = userObject.role;
    await result.save();
  }
};

export const deleteUserById = async (id: string) => {
  await User.findByIdAndDelete(id);
};

export const stornoParckageById = async (packageObject: any) => {
  const result = await packages.findById(packageObject);
  if (!result) {
    return new Error("No Package");
  } else {
    result.stornedAt = Date.now();
    await result.save();
  }
};

export const createLabel =async (id:string) => {
  console.log(id);
  
  const result = await packages.findById(id);
  if(result){
    return labelrender(result);
  }else{
    return null;
  }
}