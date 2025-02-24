import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User{
    @Prop()
    firstname:string
    @Prop()
    lastname:string
    @Prop()
    username:string;
    @Prop()
    email:string;
    @Prop()
    password:string;
    @Prop({default:"USER"})
    role: 'admin' | 'user' | 'business';
}


export const UserSchema = SchemaFactory.createForClass(User);