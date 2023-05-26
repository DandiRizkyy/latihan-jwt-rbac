import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const payload = await this.jwtService.verify(token, {
            secret: 'secret'
        });
        request['user'] = payload;

        return true;
        
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }

}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService, private prismaService: PrismaService) {}

async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();

    if(request.user.roles !== 'admin'){
        throw new ForbiddenException('You are not allowed to modify the data!')
    }

    return true;
}
}