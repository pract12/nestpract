import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('post/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() dto: CommentDto): Promise<any> {
    return this.commentService.createComment(dto);
  }

  @Get(':id')
  async getComment(@Param('id') id: string): Promise<CommentDto> {
    return this.commentService.get(id);
  }

  @Patch(':id')
  async updateComment(
    @Body() dto: UpdateCommentDto,
    @Param('id') id: string,
  ): Promise<UpdateCommentDto> {
    return this.commentService.commentUpdate(id, dto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    await this.commentService.delete(id);
  }
}
