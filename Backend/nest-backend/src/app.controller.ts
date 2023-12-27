import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './bull/job.add.service';
import multer from 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('csv')
export class AppController {
  constructor(private readonly csvService: CsvService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsvs(@UploadedFile() file: Express.Multer.File) {
    this.csvService.addToQueue(file);
    return { message: 'CSV file uploaded and processed successfully' };
  }
}
