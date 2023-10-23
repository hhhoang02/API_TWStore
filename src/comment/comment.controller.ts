import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentAddRequestDTO } from "./dto/comment_add_request";
import { Response } from "express";
import { CommentDeleteRequestDTO } from "./dto/comment_delete_request";
import { CommentGetbyProducRequesttDTO } from "./dto/comment_getbyProduct_request";

@Controller('comment')
export class CategoryController {
    constructor(private readonly commentService: CommentService) { }

    @Post('addComment')
    async AddComment(@Body() body: CommentAddRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.commentService.AddComment(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.OK).json(error);
        }
    }
    @Get('getCommentbyProduct')
    async GetCommentbyProduct(@Body() body: CommentGetbyProducRequesttDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.commentService.GetCommentbyProduct(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.OK).json(error);
        }
    }
    @Post('deleteComment')
    async DeleteComment(@Body() body: CommentDeleteRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.commentService.DeleteComment(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.OK).json(error);
        }
    }
}