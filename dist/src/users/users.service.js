"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const helpers_1 = require("../utils/helpers");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll() {
        try {
            const users = await this.prismaService.user.findMany({
                include: {
                    Competitor: true,
                },
            });
            return (0, helpers_1.excludeFieldsFromArr)(users, ["password"]);
        }
        catch (error) {
            const err = error;
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async findOne(id) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: id,
                },
                include: {
                    Competitor: true,
                },
            });
            return (0, helpers_1.excludeFields)(user, ["password"]);
        }
        catch (error) {
            const err = error;
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async update(id, updateUserDto) {
        return this.prismaService.user.update({
            where: {
                id: id,
            },
            data: {
                name: updateUserDto.name,
                role: { set: updateUserDto.role },
                password: await (0, helpers_1.hashPassword)(updateUserDto.password),
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map