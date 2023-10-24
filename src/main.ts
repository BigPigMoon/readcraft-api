import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // for web socket
  // app.useWebSocketAdapter(new WsAdapter(app));

  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .setTitle("ReadCraftAcademyAPI")
    .setDescription("This is a read craft academy api documentation")
    .setVersion("0.1")
    .addTag("main")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  app.enableCors({
    credentials: true,
    origin: true,
  });

  await app.listen(3000);
}

bootstrap();
