import mongoose from 'mongoose';

const SellSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    Itemtype: { type: String, required: true },
    ItemName: { type: String },
    image: { type: String },
    description: { type: String },
    upiid: { type: String },
}, { timestamps: true });

const SellModel = mongoose.model("Sell", SellSchema);

export default SellModel;
