import { HttpService } from '@nestjs/axios';
import { Injectable, Options, Post } from '@nestjs/common';
import axios, { Axios, AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as request from 'request';

@Injectable()
export class TtsService {
    constructor(private readonly httpService: HttpService){}
    api_url: string = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';

    async tts(answer: string): Promise<any>{
        const filePath = "./upload/2024-02-01/" + "푸른이와의 대화.mp3"

        const writer = fs.createWriteStream(filePath);

        await axios({  
            method: 'POST',
            url: this.api_url,
            data: "speaker=nara&volume=0&speed=0&pitch=0&format=mp3&text=" + answer,
            headers: {'X-NCP-APIGW-API-KEY-ID': process.env.CLOVA_CLIENT_ID, 
                    'X-NCP-APIGW-API-KEY': process.env.CLOVA_CLIENT_SECRET},
            responseType: 'stream',
            })
            .then(response => {
                return new Promise((resolve, reject) => {
                    
                // response.data.pipe(writer);
                // response.data
                console.log(response);
                let error = null;
                    // writer.on('error', err => {
                    //     error = err;
                    //     writer.close();
                    //     reject(err);
                    // });
                    // writer.on('close', () => {
                    //     if (!error) {
                    //         resolve(true);
                    //     }
                    // })
            })
        })

    }
}