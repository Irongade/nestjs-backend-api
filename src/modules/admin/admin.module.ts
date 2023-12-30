import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { UserService } from '../user/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController],
  providers: [AdminService, UserService],
})
export class AdminModule {}
