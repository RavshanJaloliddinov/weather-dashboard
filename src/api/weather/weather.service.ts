import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { WeatherEntity } from 'src/core/entity/weather.entity';
import axios from 'axios';
import { config } from 'src/config';
import { BulkRequestDto } from './dto/bulk.dto';
import { WeatherDto } from './dto/weather.dto';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {
    this.baseUrl = 'https://api.weatherapi.com/v1';
    this.apiKey = config.WEATHER_API;
  }

  // 1. Davlatlar ro'yxatini olish (RestCountries API yordamida)
  async fetchCountries(): Promise<string[]> {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data.map((country: any) => country.name.common);
    } catch (error) {
      return []; // Xatolik yuz berganda bo'sh ro'yxat qaytarish
    }
  }

  // 2. Ob-havo ma'lumotlarini olish (WeatherAPI yordamida)
  async fetchWeatherData(country: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${country}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return null; // Xatolik yuz berganda null qaytarish
    }
  }

  // 3. Ma'lumotlarni saqlash yoki yangilash
  async saveWeatherData(weatherData: any): Promise<void> {
    if (!weatherData) return; // Ma'lumot bo'lmasa, hech narsa qilmaslik

    try {
      const existingWeather = await this.weatherRepository.findOne({
        where: { name: weatherData.location.name },
      });

      if (existingWeather) {
        // Ma'lumot mavjud bo'lsa, yangilash
        existingWeather.country = weatherData.location.country;
        existingWeather.lat = weatherData.location.lat;
        existingWeather.lon = weatherData.location.lon;
        existingWeather.temp_c = weatherData.current.temp_c;
        existingWeather.wind_kph = weatherData.current.wind_kph;
        existingWeather.cloud = weatherData.current.cloud;
        existingWeather.temp_color = existingWeather.temp_color;
        existingWeather.wind_color = existingWeather.wind_color;
        existingWeather.cloud_color = existingWeather.cloud_color;

        await this.weatherRepository.save(existingWeather);
      } else {
        // Yangi ma'lumotni saqlash
        const weather = new WeatherEntity();
        weather.name = weatherData.location.name;
        weather.country = weatherData.location.country;
        weather.lat = weatherData.location.lat;
        weather.lon = weatherData.location.lon;
        weather.temp_c = weatherData.current.temp_c;
        weather.wind_kph = weatherData.current.wind_kph;
        weather.cloud = weatherData.current.cloud;
        weather.temp_color = weather.temp_color;
        weather.wind_color = weather.wind_color;
        weather.cloud_color = weather.cloud_color;

        await this.weatherRepository.save(weather);
      }
    } catch (error) {
      // Xatolikni log qilmaslik
    }
  }

  // 4. Cron job orqali ob-havo ma'lumotlarini yangilash
  @Cron('* * * * *') // Har kuni 00:00 da ishlash
  async updateWeatherData() {
    try {
      const countries = await this.fetchCountries(); // Davlatlar ro'yxatini olish

      // Parallel ravishda barcha davlatlar uchun ob-havo ma'lumotlarini olish va saqlash
      const weatherDataPromises = countries.map(async (country) => {
        try {
          const weatherData = await this.fetchWeatherData(country);
          if (weatherData) {
            await this.saveWeatherData(weatherData); // Ma'lumotlarni saqlash
          }
        } catch (error) {
          // Xatolikni log qilmaslik
        }
      });

      await Promise.all(weatherDataPromises); // Barcha so'rovlarni parallel tarzda bajarish
    } catch (error) {
      // Xatolikni log qilmaslik
    }
  }

  // 5. Mamlakat bo'yicha ob-havo ma'lumotlarini olish (API endpointi uchun)
  async getWeather(country: string): Promise<WeatherDto> {
    const weatherData = await this.fetchWeatherData(country);

    if (!weatherData) {
      return null; // Ma'lumot topilmasa, null qaytarish
    }

    const existingWeather = await this.weatherRepository.findOne({
      where: { name: weatherData.location.name },
    });

    if (existingWeather) {
      return this.mapToDto(existingWeather);
    } else {
      const weather = new WeatherEntity();
      weather.name = weatherData.location.name;
      weather.country = weatherData.location.country;
      weather.lat = weatherData.location.lat;
      weather.lon = weatherData.location.lon;
      weather.temp_c = weatherData.current.temp_c;
      weather.wind_kph = weatherData.current.wind_kph;
      weather.cloud = weatherData.current.cloud;
      weather.temp_color = weather.temp_color;
      weather.wind_color = weather.wind_color;
      weather.cloud_color = weather.cloud_color;

      const savedWeather = await this.weatherRepository.save(weather);
      return this.mapToDto(savedWeather);
    }
  }

  // 6. Entity ni DTO ga aylantirish
  private mapToDto(weather: WeatherEntity): WeatherDto {
    return {
      name: weather.name,
      country: weather.country,
      lat: weather.lat,
      lon: weather.lon,
      temp_c: weather.temp_c,
      temp_color: weather.temp_color,
      wind_kph: weather.wind_kph,
      wind_color: weather.wind_color,
      cloud: weather.cloud,
      cloud_color: weather.cloud_color,
    };
  }

  // 7. Bir nechta mamlakatlar uchun ob-havo ma'lumotlarini olish
  async getMultipleData(payload: { array: string[] }) {
    try {
      const requests = payload.array.map((country) =>
        this.fetchWeatherData(country),
      );

      const responses = await Promise.allSettled(requests); // Barcha so'rovlarni tekshiradi

      return responses.map((res) => {
        if (res.status === 'fulfilled') {
          return res.value; // So'rov muvaffaqiyatli bo'lsa, natijani qaytaradi
        } else {
          return null; // Xatolik yuz berganda null qaytarish
        }
      });
    } catch (error) {
      return []; // Xatolik yuz berganda bo'sh ro'yxat qaytarish
    }
  }

  // 8. Ob-havo ogohlantirishlarini olish
  async getAlerts(q: string) {
    try {
      const url = `${this.baseUrl}/alerts.json?key=${this.apiKey}&q=${q}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return null; // Xatolik yuz berganda null qaytarish
    }
  }

  // 9. Bir nechta joylar uchun ob-havo ma'lumotlarini olish (Bulk request)
  async getBulkWeather(bulkRequestDto: BulkRequestDto) {
    try {
      const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=bulk`;
      const response = await axios.post(url, bulkRequestDto);
      return response.data;
    } catch (error) {
      return null; // Xatolik yuz berganda null qaytarish
    }
  }

  // 10. Havo sifati ma'lumotlarini olish
  async getAirQuality(q: string) {
    try {
      const url = `${this.baseUrl}/air-quality.json?key=${this.apiKey}&q=${q}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return null; // Xatolik yuz berganda null qaytarish
    }
  }

  // 11. Astronomiya ma'lumotlarini olish (Quyosh chiqishi, botishi va oy fazalari)
  async getAstronomy(q: string, dt: string) {
    try {
      const url = `${this.baseUrl}/astronomy.json?key=${this.apiKey}&q=${q}&dt=${dt}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return null; // Xatolik yuz berganda null qaytarish
    }
  }

  // 12. Sport tadbirlari uchun ob-havo ma'lumotlarini olish
  async getSportsEvents(q: string) {
    try {
      const url = `${this.baseUrl}/sports.json?key=${this.apiKey}&q=${q}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return null; // Xatolik yuz berganda null qaytarish
    }
  }

  // 13. Dengiz ob-havosi ma'lumotlarini olish 
  async getMarineWeather(q: string) {
    try {
      const url = `${this.baseUrl}/marine.json?key=${this.apiKey}&q=${q}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return null; // Xatolik yuz berganda null qaytarish
    }
  }

  // 14. Saqlangan ma'lumotlarni olish
  async getSavedData() {
    console.log(1111111)
    return await this.weatherRepository.find();
  }
}