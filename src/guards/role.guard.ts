import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { IS_PUBLIC_KEY } from "../auth/decorator/public.decorator";
import { ROLES_KEY } from "../auth/decorator/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler()
    );
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
