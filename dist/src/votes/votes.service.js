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
exports.VotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VotesService = class VotesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createVoteDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: createVoteDto.userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException("User not Found!");
        }
        if (user.role !== "USER") {
            throw new common_1.BadRequestException("Only users can vote for competitors");
        }
        const voteExists = await this.prismaService.vote.findFirst({
            where: {
                userId: createVoteDto.userId,
            },
        });
        if (voteExists) {
            throw new common_1.BadRequestException("You have already voted for this competitor!");
        }
        const vote = await this.prismaService.vote.create({
            data: createVoteDto,
            include: { competitor: true, user: true },
        });
        const competitor = await this.prismaService.competitor.findUnique({
            where: {
                id: vote.competitorId,
            },
            include: { Votes: true },
        });
        const votes = competitor.Votes;
        const voteCount = votes.length;
        await this.prismaService.competitor.update({
            where: {
                id: vote.competitorId,
            },
            data: {
                voteCount,
            },
        });
        return {
            success: true,
            message: "Your vote has been counted successfull",
        };
    }
    findAll() {
        return this.prismaService.vote.findMany({
            include: { competitor: true, user: true },
        });
    }
    findOne(id) {
        return this.prismaService.vote.findUnique({
            where: {
                id,
            },
            include: { competitor: true, user: true },
        });
    }
    update(id, updateVoteDto) {
        return this.prismaService.vote.update({
            where: {
                id,
            },
            data: updateVoteDto,
            include: { competitor: true, user: true },
        });
    }
};
exports.VotesService = VotesService;
exports.VotesService = VotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VotesService);
//# sourceMappingURL=votes.service.js.map