import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
    private readonly s3cli: S3Client;

    constructor(
        private configService: ConfigService
    ){
        this.s3cli = new S3Client({
            region: this.configService.get('AWS_REGION'), 
            credentials: {
              accessKeyId: 'AKIA2NTJEVIJ44JY5PP2',
              secretAccessKey: '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',
            },
        });
    }

    async upload(file: Express.Multer.File, fileName: string){
        const params = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            ACL: 'public-read',
            Key: fileName,
            Body: file.buffer
        })
        await this.s3cli.send(params)

        return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${fileName}`;
    }
}
