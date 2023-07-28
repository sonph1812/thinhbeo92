import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./app-module/users/users.controller";
import { UsersModule } from "./app-module/users/users.module";
import { AuthModule } from "./app-module/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./app-module/config/database.config";
import authConfig from "./app-module/config/auth.config";
import appConfig from "./app-module/config/app.config";
import { FilesModule } from "./app-module/files/files.module";
import { BannerModule } from "./app-module/banner/banner.module";
import { ProductModule } from "./app-module/product/product.module";
import { CartModule } from "./app-module/cart/cart.module";
import { OrdersModule } from "./app-module/orders/orders.module";
import { TierModelModule } from "./app-module/tier-model/tier-model.module";
import { ModelModule } from "./app-module/model/model.module";
import { CategoriesModule } from "./app-module/categories/categories.module";
import { BrandModule } from "./app-module/brand/brand.module";
import { SharedModule } from "./app-module/shared/shared.module";
import { AddressModule } from "./app-module/address/address.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DatabaseOptions } from "./app-module/database";

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
