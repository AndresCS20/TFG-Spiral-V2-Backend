import {Schema, model} from 'mongoose';
import { Car } from '../interfaces/car.interface';

const ItemSchema = new Schema<Car>(
    {
        color:{
            type: String,
            required: true      
        },
        gas:{
            type: String,
            enum:['gasolina', 'diesel', 'electrico'],
            default: 'gasolina'
        },
        year:{
            type: Number,
            required: true
        },
        description:{
            type: String
        },
        price:{
            type: Number
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ItemModel = model('Item',ItemSchema);
export default ItemModel;