import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile,Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import {FileInterceptor} from '@nestjs/platform-express'
import { join } from 'path';
import type { Response } from 'express'
// 文件上传
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  upload (@UploadedFile() file) {
    return file
  }
  
  // 文件下载
  @Get('export')
  download(@Res() res: Response){
    const url = join(__dirname,'../images/1709534029026.png')
    res.download(url)
     
  }
}
