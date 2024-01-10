import { Controller,Post, Body, Res }  from '@nestjs/common';
import { WebScrapeDto } from './dto/web-scraping.dto';
import { WebScrapingService } from './web-scraping.service';
import * as fs from 'fs';
import { HttpStatusCodes, WEB_SCRAPING_RESPONSE } from 'src/common/response';
import { join } from 'path';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('WebScraper')
@Controller('WebScraper')
export class WebScrapingController {

    constructor(private readonly webScrapingService: WebScrapingService) {}

@ApiResponse({ status: 200, description: 'The data has been successfully Scraped.'})
@Post('/get-data')
async scrape(@Body() webScrapeDto: WebScrapeDto, @Res() response) {
    try{
        const { url, htmlTag, attributeName } = webScrapeDto;
        const fetchedData = await this.webScrapingService.scrapeData(webScrapeDto);
        
        if(!fetchedData){
            return response.status(HttpStatusCodes.NOT_FOUND).json({
                message: WEB_SCRAPING_RESPONSE.NOT_FOUND,
                fetchedData,
              });
        }
        const jsonData = JSON.stringify(fetchedData, null, 2);
            const folderPath = 'output';
            const filename = join(folderPath, `data_${new Date().toISOString()}.json`);
    
            // const filename = `data_${new Date().toISOString()}.json`;
    
            fs.writeFileSync(filename, jsonData);
    
            response.setHeader('Content-disposition', `attachment; filename=${filename}`);
            response.setHeader('Content-type', 'application/json');
    
            return response.status(HttpStatusCodes.OK).json({
                message: WEB_SCRAPING_RESPONSE.SUCCESS,
                fetchedData,
              }); 

    }catch(error){
         
        return response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message:-WEB_SCRAPING_RESPONSE.INTERNAL_SERVER_ERROR,
            error: error.message,
          });
    }
  }

}
