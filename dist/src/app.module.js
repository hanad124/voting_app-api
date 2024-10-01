"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./guards/auth.guard");
const role_guard_1 = require("./guards/role.guard");
const user_module_1 = require("./users/user.module");
const competitor_module_1 = require("./competitor/competitor.module");
const votes_module_1 = require("./votes/votes.module");
const upload_module_1 = require("./upload/upload.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            prisma_module_1.PrimsaModule,
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            votes_module_1.VotesModule,
            competitor_module_1.CompetitorModule,
            upload_module_1.UploadModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map