"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebScrapingController = void 0;
const common_1 = require("@nestjs/common");
const web_scraping_dto_1 = require("./dto/web-scraping.dto");
const web_scraping_service_1 = require("./web-scraping.service");
const fs = require("fs");
const response_1 = require("../../common/response");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
let WebScrapingController = class WebScrapingController {
    constructor(webScrapingService) {
        this.webScrapingService = webScrapingService;
    }
    async scrape(webScrapeDto, response) {
        try {
            const { url, htmlTag, attributeName } = webScrapeDto;
            const fetchedData = await this.webScrapingService.scrapeData(webScrapeDto);
            if (!fetchedData) {
                return response.status(response_1.HttpStatusCodes.NOT_FOUND).json({
                    message: response_1.WEB_SCRAPING_RESPONSE.NOT_FOUND,
                    fetchedData,
                });
            }
            const jsonData = JSON.stringify(fetchedData, null, 2);
            const folderPath = 'output';
            const filename = (0, path_1.join)(folderPath, `data_${new Date().toISOString()}.json`);
            fs.writeFileSync(filename, jsonData);
            response.setHeader('Content-disposition', `attachment; filename=${filename}`);
            response.setHeader('Content-type', 'application/json');
            return response.status(response_1.HttpStatusCodes.OK).json({
                message: response_1.WEB_SCRAPING_RESPONSE.SUCCESS,
                fetchedData,
            });
        }
        catch (error) {
            return response.status(response_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: -response_1.WEB_SCRAPING_RESPONSE.INTERNAL_SERVER_ERROR,
                error: error.message,
            });
        }
    }
};
exports.WebScrapingController = WebScrapingController;
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The data has been successfully Scraped.' }),
    (0, common_1.Post)('/get-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web_scraping_dto_1.WebScrapeDto, Object]),
    __metadata("design:returntype", Promise)
], WebScrapingController.prototype, "scrape", null);
exports.WebScrapingController = WebScrapingController = __decorate([
    (0, swagger_1.ApiTags)('WebScraper'),
    (0, common_1.Controller)('WebScraper'),
    __metadata("design:paramtypes", [web_scraping_service_1.WebScrapingService])
], WebScrapingController);
//# sourceMappingURL=web-scraping.controller.js.map