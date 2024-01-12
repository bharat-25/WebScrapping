import { WebScrapeDto } from './dto/web-scraping.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { WEB_SCRAPING_RESPONSE } from 'src/common/response';

@Injectable()
export class WebScrapingService {
    async scrapeData(webScrapeDto:WebScrapeDto) {
        try {
          
          const response = await axios.get(webScrapeDto.url);
          const $ = cheerio.load(response.data);
          const data: string[] = [];

          $(webScrapeDto.htmlTag).each((index, element) => {
            const tagData = $(element).attr(webScrapeDto.attributeName) || $(element).text();
           
            if(tagData){
                data.push(tagData);
            }
        });
        return data
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('Axios Error') 
            throw new Error(WEB_SCRAPING_RESPONSE.INVALID_URL);
          }
          else{
            console.log('Web Scraping Error: ', error)
            throw new Error(WEB_SCRAPING_RESPONSE.INVALID_DATA);
          }
        }
      }
}
