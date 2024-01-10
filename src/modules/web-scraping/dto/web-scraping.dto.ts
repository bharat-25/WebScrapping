import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WebScrapeDto {

    @ApiProperty({
      description: 'URL for Data Scraping ',
      required:true,
      example:'https://appinventiv.com',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^https?:\/\/\S+/) 
    url: string;
 
    @ApiProperty({
      description: 'HTML TAG for Data Scraping ',
      required:true,
      example:'a',
    })
    @IsNotEmpty()
    @IsString()
    htmlTag: string;
    
    @ApiProperty({
      description: 'ATTRIBUTE NAME for Data Scraping',
      required:true,
      example:'href',
    })
    @IsNotEmpty()
    @IsString()
    attributeName: string;
  }
  