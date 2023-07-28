import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import authConfig from "./config/auth.config";
import appConfig from "./config/app.config";
import { FilesModule } from "./files/files.module";
import { BannerModule } from "./banner/banner.module";
import { ProductModule } from "./product/product.module";
import { CartModule } from "./cart/cart.module";
import { OrdersModule } from "./orders/orders.module";
import { TierModelModule } from "./tier-model/tier-model.module";
import { ModelModule } from "./model/model.module";
import { CategoriesModule } from "./categories/categories.module";
import { BrandModule } from "./brand/brand.module";
import { SharedModule } from "./shared/shared.module";
import { AddressModule } from "./address/address.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DatabaseOptions } from "./database";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseOptions,
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    // AuthFacebookModule,
    // AuthGoogleModule,
    // ForgotModule,
    // MailModule,
    // HomeModule,
    BannerModule,
    SharedModule,
    BrandModule,
    CategoriesModule,
    ProductModule,
    ModelModule,
    TierModelModule,
    // StripeModule,
    // MomoModule,
    OrdersModule,
    // CashModule,
    // ReviewModule,
    CartModule,
    AddressModule,
    // StatisticalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
