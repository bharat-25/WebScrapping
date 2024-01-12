"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGAR_RESPONSE = exports.HttpStatusCodes = exports.WEB_SCRAPING_RESPONSE = void 0;
exports.WEB_SCRAPING_RESPONSE = {
    INTERNAL_SERVER_ERROR: 'INTERNAL SERVER ERROR',
    SUCCESS: 'DATA FETCH SUCCESSFULLY',
    NOT_FOUND: 'DATA NOT FOUND',
    BAD_REQUEST: 'BAD REQUEST, PLS CHECK THE INPUT VALUES',
    INVALID_URL: 'INVALID URL..PLS CHECK AGAIN THE URL AND TRY AGAIN',
    INVALID_DATA: 'INVALID DATA PROVIDED... PLS PROVIDE RIGHT URL, HTML_TAG, ATTRIBUTE_NAME'
};
exports.HttpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};
exports.SWAGGAR_RESPONSE = {
    SUCCESS: 'The data has been successfully scraped',
    NOT_FOUND: 'No data found for the specified criteria.',
    BAD_REQUEST: 'Bad Request. Please check the inputs.'
};
//# sourceMappingURL=response.js.map