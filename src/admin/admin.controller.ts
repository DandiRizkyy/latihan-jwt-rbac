import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) {}

    // get all admin

    // patch admin

    // delete admin
}
