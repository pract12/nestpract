import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { postDocument } from './post.scehma';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('post') private readonly postModel: Model<postDocument>,
  ) {}

  async create(dto: PostDto): Promise<any> {
    return await this.postModel.create(dto);
  }

  async get(id: string): Promise<PostDto> {
    return this.postModel.findById({ _id: id }).populate('userId');
  }

  async postUpdate(id: string, dto: UpdatePostDto): Promise<UpdatePostDto> {
    return this.postModel.findOneAndUpdate({ _id: id }, dto);
  }

  async delete(id: string): Promise<any> {
    return this.postModel.deleteOne({ _id: id });
  }
}
// this.httpService
//       .get('https://jsonplaceholder.typicode.com/posts')
//       .subscribe((value) => {
//         console.log('a', value.data);
//       });
