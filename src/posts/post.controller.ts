import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('user/post')
export class PostController {
  constructor(
    private readonly postService: PostService, //@InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}

  @Post()
  async createPost(@Body() dto: PostDto): Promise<PostDto> {
    return this.postService.create(dto);
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostDto> {
    return this.postService.get(id);
  }

  @Patch(':id')
  async updatePost(
    @Body() dto: UpdatePostDto,
    @Param('id') id: string,
  ): Promise<UpdatePostDto> {
    return this.postService.postUpdate(id, dto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    await this.postService.delete(id);
  }
}
