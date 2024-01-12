import { WebScrapeDto } from "./dto/web-scraping.dto";
import { WebScrapingService } from "./web-scraping.service";
export declare class WebScrapingController {
    private readonly webScrapingService;
    constructor(webScrapingService: WebScrapingService);
    scrape(webScrapeDto: WebScrapeDto, response: any): Promise<any>;
}
