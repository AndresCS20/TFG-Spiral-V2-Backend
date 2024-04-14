import { Role } from '@interfaces/role.interface';
import { Schema, model } from 'mongoose'

const RoleSchema = new Schema<Role>({
    name: {
        type: String
    }
})

const RoleModel = model('Role',RoleSchema);
export default RoleModel;