import { Controller, Post, Body, Res } from "@nestjs/common";
import { WebScrapeDto } from "./dto/web-scraping.dto";
import { WebScrapingService } from "./web-scraping.service";
import * as fs from "fs";
import { HttpStatusCodes, SWAGGAR_RESPONSE, WEB_SCRAPING_RESPONSE } from "src/common/response";
import { join } from "path";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("WebScraper")
@Controller("WebScraper")
export class WebScrapingController {
  constructor(private readonly webScrapingService: WebScrapingService) {}

  @ApiResponse({status: HttpStatusCodes.OK,description: SWAGGAR_RESPONSE.SUCCESS})
  @ApiResponse({ status: HttpStatusCodes.BAD_REQUEST, description: SWAGGAR_RESPONSE.BAD_REQUEST })
  @ApiResponse({ status: HttpStatusCodes.NOT_FOUND, description: SWAGGAR_RESPONSE.NOT_FOUND })
  @Post("/get-data")
  async scrape(@Body() webScrapeDto: WebScrapeDto, @Res() response) {
    try {
      const { url, htmlTag, attributeName } = webScrapeDto;

      const fetchedData =await this.webScrapingService.scrapeData(webScrapeDto);

      if( fetchedData.length <= 0) {
          console.log(fetchedData.length)
        return response.status(HttpStatusCodes.NOT_FOUND).json({
          message: WEB_SCRAPING_RESPONSE.NOT_FOUND,
        });
      }
      const jsonData = JSON.stringify(fetchedData, null, 2);
      const folderPath = "output";
      const filename = join(folderPath,`data_${new Date().toISOString()}.json`);

      // const filename = `data_${new Date().toISOString()}.json`;

      fs.writeFileSync(filename, jsonData);

      response.setHeader("Content-disposition",`attachment; filename=${filename}`);
      response.setHeader("Content-type", "application/json");

      return response.status(HttpStatusCodes.OK).json({
        message: WEB_SCRAPING_RESPONSE.SUCCESS,
        fetchedData,
      });
    } catch (error) {
      return response.status(HttpStatusCodes.BAD_REQUEST).json({
        message: WEB_SCRAPING_RESPONSE.BAD_REQUEST,
        error: error.message,
      });
    }
  }
}
