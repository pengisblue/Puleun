import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
    async resolveFileName(){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        // padstart는 문자열의 길이를 맞추고 부족한 부분은 지정한 문자로 채워줌
        // 1 -> 01 
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const path = `./upload/${formattedDate}`;
        return path;
    }
}
