<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a> </p><p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p> <p align="center"> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a> <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a> <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a> <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" /></a> <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a> <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a> <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" /></a> <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us" /></a> <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" /></a> </p>
Tavsif
NestJS - bu samarali va kengaytiriladigan server ilovalarini qurish uchun moʻljallangan progressiv Node.js frameworki. Ushbu loyiha ob-havo maʼlumotlarini olish, foydalanuvchilarni boshqarish va autentifikatsiya qilish imkoniyatlarini taqdim etadi.

Oʻrnatish
Loyihani ishga tushirish uchun quyidagi qadamlarni bajaring:

Loyihani klonlang:

bash
Copy
git clone https://github.com/sizning-loyihangiz.git
cd loyiha-nomi
Zarur paketlarni oʻrnating:

bash
Copy
pnpm install
Loyihani ishga tushiring:

bash
Copy
pnpm start
Swagger dokumentatsiyasini koʻrish uchun brauzerda quyidagi manzilga kiring:

Copy
http://localhost:3000/api
API Endpointlari
Weather Controller

1. Mamlakat boʻyicha ob-havo maʼlumotlari
   URL: GET /weather/:country

Tavsif: Berilgan mamlakat uchun ob-havo maʼlumotlarini qaytaradi.

Parametrlar:

country (string): Mamlakat nomi (masalan, Uzbekistan).

Namuna soʻrov:

bash
Copy
GET /weather/Uzbekistan 2. Bir nechta mamlakatlar uchun ob-havo maʼlumotlari
URL: GET /weather?countries=country1,country2

Tavsif: Berilgan mamlakatlar roʻyxati uchun ob-havo maʼlumotlarini qaytaradi.

Parametrlar:

countries (string): Mamlakatlar roʻyxati (vergul bilan ajratilgan, masalan, Tashkent,London,New York).

Namuna soʻrov:

bash
Copy
GET /weather?countries=Tashkent,London,New York 3. Ob-havo ogohlantirishlari
URL: GET /weather/alerts?q=location

Tavsif: Berilgan joy uchun ob-havo ogohlantirishlarini qaytaradi.

Parametrlar:

q (string): Joylashuv soʻrovi (masalan, shahar nomi, pochta indeksi).

Namuna soʻrov:

bash
Copy
GET /weather/alerts?q=London 4. Bir nechta joylar uchun ob-havo maʼlumotlari
URL: POST /weather/bulk

Tavsif: Bir nechta joylar uchun ob-havo maʼlumotlarini bir soʻrovda qaytaradi.

Body:

json
Copy
{
"locations": [
{ "id": 1, "name": "Tashkent" },
{ "id": 2, "name": "London" }
]
} 5. Havo sifatini olish
URL: GET /weather/air-quality?q=location

Tavsif: Berilgan joy uchun havo sifatini qaytaradi.

Parametrlar:

q (string): Joylashuv soʻrovi (masalan, shahar nomi, pochta indeksi).

Namuna soʻrov:

bash
Copy
GET /weather/air-quality?q=London 6. Astronomiya maʼlumotlari
URL: GET /weather/astronomy?q=location&dt=yyyy-MM-dd

Tavsif: Berilgan joy va sana uchun quyosh chiqishi, botishi va oy fazasini qaytaradi.

Parametrlar:

q (string): Joylashuv soʻrovi.

dt (string): Sana (yyyy-MM-dd formatida).

Namuna soʻrov:

bash
Copy
GET /weather/astronomy?q=London&dt=2023-10-01 7. Sport tadbirlari uchun ob-havo maʼlumotlari
URL: GET /weather/sports?q=location

Tavsif: Berilgan joy uchun sport tadbirlari uchun ob-havo maʼlumotlarini qaytaradi.

Parametrlar:

q (string): Joylashuv soʻrovi.

Namuna soʻrov:

bash
Copy
GET /weather/sports?q=London 8. Dengiz ob-havosi maʼlumotlari
URL: GET /weather/marine?q=location

Tavsif: Berilgan joy uchun dengiz ob-havosi maʼlumotlarini qaytaradi.

Parametrlar:

q (string): Joylashuv soʻrovi.

Namuna soʻrov:

bash
Copy
GET /weather/marine?q=London 9. Saqlangan ob-havo maʼlumotlari
URL: GET /weather/saved-data

Tavsif: Saqlangan ob-havo maʼlumotlarini qaytaradi.

Namuna soʻrov:

bash
Copy
GET /weather/saved-data
User Controller

1. Yangi foydalanuvchi yaratish
   URL: POST /users

Tavsif: Yangi foydalanuvchi yaratadi.

Body:

json
Copy
{
"username": "user1",
"password": "password123",
"email": "user1@example.com"
} 2. Barcha foydalanuvchilarni olish
URL: GET /users

Tavsif: Barcha foydalanuvchilarni roʻyxatini qaytaradi.

3. Foydalanuvchini ID boʻyicha olish
   URL: GET /users/:id

Tavsif: Berilgan ID boʻyicha foydalanuvchini qaytaradi.

Parametrlar:

id (string): Foydalanuvchi ID si.

4. Foydalanuvchini yangilash
   URL: PUT /users/:id

Tavsif: Berilgan ID boʻyicha foydalanuvchini yangilaydi.

Body:

json
Copy
{
"username": "updatedUser",
"email": "updated@example.com"
} 5. Foydalanuvchini oʻchirish
URL: DELETE /users/:id

Tavsif: Berilgan ID boʻyicha foydalanuvchini oʻchiradi.

6. Foydalanuvchini username boʻyicha qidirish
   URL: GET /users/:username

Tavsif: Berilgan username boʻyicha foydalanuvchini qaytaradi.

Auth Controller

1. Registratsiya
   URL: POST /auth/register

Tavsif: Yangi foydalanuvchini roʻyxatdan oʻtkazadi.

Body:

json
Copy
{
"username": "user1",
"password": "password123",
"email": "user1@example.com"
} 2. Login
URL: POST /auth/login

Tavsif: Foydalanuvchini tizimga kirish va tokenlarni qaytaradi.

Body:

json
Copy
{
"username": "user1",
"password": "password123"
}
Muallif
Ushbu loyiha [Sizning Nomingiz] tomonidan ishlab chiqilgan.
