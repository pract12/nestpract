import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { commentDocument } from './comment.schema';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment')
    private readonly commentModel: Model<commentDocument>,
  ) {}

  async createComment(dto: CommentDto): Promise<any> {
    return this.commentModel.create(dto);
  }

  async get(id: string): Promise<CommentDto> {
    return this.commentModel.findById({ _id: id }).populate('postId');
  }

  async commentUpdate(id: string, dto: UpdateCommentDto): Promise<any> {
    return this.commentModel.findOneAndUpdate({ _id: id }, dto);
  }

  async delete(id: string): Promise<any> {
    return this.commentModel.deleteOne({ _id: id });
  }
}
