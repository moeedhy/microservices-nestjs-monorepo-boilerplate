import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '@app/common/enums';
@Schema({ id: true, versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [UserRoles], required: true, default: [UserRoles.user] })
  roles: UserRoles[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
