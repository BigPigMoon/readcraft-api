import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "src/common/decorators/public.decorator";
import { RtGuard } from "../common/guards";
import { GetCurrentUser } from "../common/decorators";
import { Tokens } from "./types";
import { SingInDto, SingUpDto } from "./dto";

@ApiBearerAuth()
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Регистрирует пользователя" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Пользователь был зарегистрирован",
    type: Tokens,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Если имя или почта уже занята",
  })
  @Public()
  @Post("local/signup")
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: SingUpDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }

  @ApiOperation({ summary: "Логинит пользователя" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Пользователь залогинился",
    type: Tokens,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Если пользователь по не найден",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Если пароль не валиден",
  })
  @Public()
  @Post("local/signin")
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: SingInDto): Promise<Tokens> {
    return this.authService.signInLocal(dto);
  }

  @ApiOperation({
    summary: "Разлогинивает пользователя и удаляет токен из базы",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Пользователь разлогинен",
  })
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser("sub") userId: number): Promise<void> {
    return this.authService.logout(userId);
  }

  @ApiOperation({ summary: "Обновляет токены" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "JWT токены были обновлены",
    type: Tokens,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Если токен не валиден или не может быть обновлен",
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  refreshTokens(
    @GetCurrentUser("sub") userId: number,
    @GetCurrentUser("refreshToken") rt: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, rt);
  }
}
