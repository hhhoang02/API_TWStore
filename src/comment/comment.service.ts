import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment, CommentDocument } from "./comment.schema";
import { CommentAddRequestDTO } from "./dto/comment_add_request";
import { CommentResponseDTO } from "./dto/comment_response";
import { CommentGetbyProductResponseDTO } from "./dto/comment_getAll_response";
import { CommentDeleteRequestDTO } from "./dto/comment_delete_request";
import { CommentGetbyProducRequesttDTO } from "./dto/comment_getbyProduct_request";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>) { }
    async AddComment(requestDTO: CommentAddRequestDTO): Promise<CommentResponseDTO> {
        try {
            const { userID, productID, createAt, content, star } = requestDTO;
            const comment = await this.commentModel.findOne({ userID, productID, createAt, content, star });
            if (comment) {
                return {
                    status: false,
                    message: 'Comment already exists',
                }
            }
            const newComment = new this.commentModel({ name });
            await newComment.save();
            return {
                status: true,
                message: 'Add Comment successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: 'Add Comment failed',
            }
        }
    }
    async GetCommentbyProduct(requestDTO: CommentGetbyProducRequesttDTO): Promise<CommentGetbyProductResponseDTO> {
        try {
            const { productID } = requestDTO;
            const responseDTO = await this.commentModel.findById({ productID });
            return responseDTO;
        } catch (error) {
            return error;
        }
    }
    async DeleteComment(requestDTO: CommentDeleteRequestDTO): Promise<CommentResponseDTO> {
        try {
            const { _id } = requestDTO;
            const comment = await this.commentModel.findById(_id);
            if (!comment) return {
                status: false,
                message: 'comment not found',
            };
            await this.commentModel.findByIdAndDelete(_id);
            return {
                status: true,
                message: 'Delete comment successfully',
            };
        } catch (error) {
            return {
                status: false,
                message: 'Delete comment failed',
            };
        }
    }
}