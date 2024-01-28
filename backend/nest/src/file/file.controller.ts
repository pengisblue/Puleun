import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { diskStorage } from 'multer';

@Controller('file')
export class FileController {
    @Post()
    // post를 보낼때 key를 file로 해서 보내야 됨
    @UseInterceptors(FileInterceptor('file', {storage:diskStorage({
        destination(req, file, callback) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            // padstart는 문자열의 길이를 맞추고 부족한 부분은 지정한 문자로 채워줌
            // 1 -> 01 
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const path = `./upload/${formattedDate}`;
            if(!existsSync(path)) mkdirSync(path, {recursive: true});
            // 에러가 날시 null을 던지고 업로드할 폴더를 정해줌
            callback(null, path);
            },
            filename(req, file, callback) {
                callback(null, file.originalname);
            },
        })
    }))
    handleFileUpload(@UploadedFile() file: Express.Multer.File) {
      console.log(file); // 업로드된 파일 정보 확인
      // 파일을 저장하거나 다른 작업을 수행할 수 있습니다.
    }
    @Get(':filename')
    downloadFile(@Param('filename') filename: string, @Res() res: Response) {
        const file = `./upload/${filename}`;
        readFileSync(file);
    }

}
