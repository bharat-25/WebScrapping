import { Module } from '@nestjs/common';
import { WebScrapingModule } from './modules/web-scraping/web-scraping.module';

@Module({
  imports: [WebScrapingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
