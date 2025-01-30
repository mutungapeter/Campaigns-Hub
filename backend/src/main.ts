import { NestFastifyApplication } from '@nestjs/platform-fastify';  // Add this import

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie'; 
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));
 
  app.use(cookieParser()); 
  app.enableCors({
    origin: true,  
    credentials: true,  
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established');
  });

  mongoose.connection.on('error', (err: any) => {
    console.error('Failed to connect to MongoDB', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
  });

  
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB connection is already established');
  } else {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI environment variable is not defined');
    mongoose.connect(process.env.MONGO_URI);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
