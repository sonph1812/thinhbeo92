import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/shared/services/base.service';
import { FileType } from './file.constant';
import { getVideoDuration } from 'src/utils/get-duration-video-file';
import { FileEntity } from './entities/file.entity';
import * as fs from 'fs';

@Injectable()
export class FilesService extends BaseService<
  FileEntity,
  Repository<FileEntity>
> {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {
    super(fileRepository, 'super');
  }

  async uploadFile(file): Promise<FileEntity> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const path = await this.saveImg(file);
    //     {
    //   local: `/${this.configService.get('app.apiPrefix')}/v1/${filePath}`,
    // };

    const fileEntity = await this.fileRepository.save(
      this.fileRepository.create({
        path: path,
      }),
    );
    const fileExtention = file.path.split('.').pop();
    let type = FileType.IMAGE;
    if (['mp4'].includes(fileExtention)) {
      type = FileType.VIDEO;
      const duration = await getVideoDuration(file.path);
      fileEntity.duration = Math.floor(duration);
    }
    fileEntity.type = type;

    return this.fileRepository.save(this.fileRepository.create(fileEntity));
  }

  async uploadFiles(files): Promise<FileEntity[]> {
    const uploadPromise = files?.map((file) => this.uploadFile(file));
    return await Promise.all(uploadPromise);
  }

  async saveImg(file: any) {
    const filename = file.filename;
    const path = file.path;
    const mime = file.mimetype.split('/')[1];
    const newFileName = filename + '.' + mime;
    const basePath = `.${process.env.FORDEL_IMAGE + newFileName}`;
    const bufferFile = fs.readFileSync(path);
    if (!fs.existsSync(`.${process.env.FORDEL_IMAGE}`)) {
      fs.mkdirSync(process.env.FORDEL_IMAGE);
    }

    fs.writeFileSync(basePath, bufferFile);
    const pathImageServe = process.env.FORDEL_IMAGE + newFileName;

    fs.unlink(`.${process.env.FORDEL_IMAGE + filename}`, (e) => {
      if (e) {
        console.log(e);
      }
    });
    return pathImageServe;
  }
}
