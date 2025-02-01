import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { AlertDto } from './dto/alerts.dto';
import { BulkRequestDto } from './dto/bulk.dto';
import { WeatherDto } from './dto/weather.dto';

@ApiTags('Weather') // Swagger uchun tag
@Controller('weather') // Controllerning asosiy manzili
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  @Get(':country')
  @ApiOperation({
    summary: 'Mamlakat boʻyicha ob-havo maʼlumotlarini olish',
    description: 'Berilgan mamlakat uchun ob-havo maʼlumotlarini qaytaradi.',
  })
  @ApiParam({ name: 'country', description: 'Mamlakat nomi', example: 'Uzbekistan' })
  @ApiResponse({ status: 200, description: 'Ob-havo maʼlumotlari muvaffaqiyatli qaytarildi.', type: WeatherDto })
  @ApiResponse({ status: 404, description: 'Mamlakat topilmadi.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWeather(@Param('country') country: string): Promise<WeatherDto> {
    return this.weatherService.getWeather(country);
  }

  @Get()
  @ApiOperation({ summary: 'Bir nechta mamlakatlar uchun ob-havo maʼlumotlari', description: 'Berilgan mamlakatlar roʻyxati uchun ob-havo maʼlumotlarini qaytaradi.' })
  @ApiQuery({ name: 'countries', description: 'Mamlakatlar roʻyxati (vergul bilan ajratilgan)', example: 'Tashkent,London,New York' })
  @ApiResponse({ status: 200, description: 'Ob-havo maʼlumotlari muvaffaqiyatli qaytarildi.' })
  @ApiResponse({ status: 400, description: 'Notoʻgʻri soʻrov.' })
  async getMultipleWeather(@Query('countries') countries: string) {
    const countryList = countries.split(','); // Stringni arrayga aylantiramiz
    return this.weatherService.getMultipleData({ array: countryList });
  }

  @Get('alerts')
  @ApiOperation({ summary: 'Ob-havo ogohlantirishlari', description: 'Berilgan joy uchun ob-havo ogohlantirishlarini qaytaradi.' })
  @ApiQuery({ name: 'q', description: 'Joylashuv soʻrovi (masalan, shahar nomi, pochta indeksi)', example: 'London' })
  @ApiResponse({ status: 200, description: 'Ob-havo ogohlantirishlari muvaffaqiyatli qaytarildi.', type: AlertDto })
  @ApiResponse({ status: 400, description: 'Notoʻgʻri soʻrov.' })
  @UsePipes(new ValidationPipe({ transform: true })) // Validatsiya
  async getAlerts(@Query('q') q: string): Promise<AlertDto> {
    return this.weatherService.getAlerts(q);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Bir nechta joylar uchun ob-havo maʼlumotlari', description: 'Bir nechta joylar uchun ob-havo maʼlumotlarini bir soʻrovda qaytaradi.' })
  @ApiBody({ type: BulkRequestDto, description: 'Joylar roʻyxati va ularning maxsus ID lari' })
  @ApiResponse({ status: 200, description: 'Ob-havo maʼlumotlari muvaffaqiyatli qaytarildi.' })
  @ApiResponse({ status: 400, description: 'Notoʻgʻri soʻrov.' })
  @UsePipes(new ValidationPipe({ transform: true })) // Validatsiya
  async getBulkWeather(@Body() bulkRequestDto: BulkRequestDto) {
    return this.weatherService.getBulkWeather(bulkRequestDto);
  }

  @Get('air-quality')
  @ApiOperation({ summary: 'Get air quality data', description: 'Returns air quality index (AQI) for the specified location.' })
  @ApiQuery({ name: 'q', description: 'Location query (e.g., city name, zip code)', example: 'London' })
  @ApiResponse({ status: 200, description: 'Air quality data' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async getAirQuality(@Query('q') q: string) {
    return this.weatherService.getAirQuality(q);
  }

  @Get('astronomy')
  @ApiOperation({ summary: 'Get astronomy data', description: 'Returns sunrise, sunset, and moon phase data for the specified location and date.' })
  @ApiQuery({ name: 'q', description: 'Location query (e.g., city name, zip code)', example: 'London' })
  @ApiQuery({ name: 'dt', description: 'Date in yyyy-MM-dd format', example: '2023-10-01' })
  @ApiResponse({ status: 200, description: 'Astronomy data' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async getAstronomy(@Query('q') q: string, @Query('dt') dt: string) {
    return this.weatherService.getAstronomy(q, dt);
  }

  @Get('sports')
  @ApiOperation({ summary: 'Get sports events weather data', description: 'Returns weather data for sports events in the specified location.' })
  @ApiQuery({ name: 'q', description: 'Location query (e.g., city name, zip code)', example: 'London' })
  @ApiResponse({ status: 200, description: 'Sports events weather data' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async getSportsEvents(@Query('q') q: string) {
    return this.weatherService.getSportsEvents(q);
  }

  @Get('marine')
  @ApiOperation({ summary: 'Get marine weather data', description: 'Returns marine weather data for the specified location.' })
  @ApiQuery({ name: 'q', description: 'Location query (e.g., city name, zip code)', example: 'London' })
  @ApiResponse({ status: 200, description: 'Marine weather data' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async getMarineWeather(@Query('q') q: string) {
    return this.weatherService.getMarineWeather(q);
  }

  @Get('saved-data')
  @ApiOperation({ summary: 'Get saved weather data', description: 'Returns saved weather data for the specified location.' })
  @ApiResponse({ status: 200, description: 'Saved weather data' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async getSavedData() {
    return this.weatherService.getSavedData()
  }
}