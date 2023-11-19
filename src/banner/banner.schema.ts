import { Prop, SchemaFactory } from "@nestjs/mongoose";
export type BannerDocument = Banner & Document;

export class Banner {
    @Prop()
    title: string
    @Prop()
    image: string
    @Prop()
    typeUpdate: string
    @Prop()
    position: number
}
export const BannerSchema = SchemaFactory.createForClass(Banner);
