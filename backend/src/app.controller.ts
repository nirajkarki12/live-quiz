import { Controller, Get, Res, Param} from '@nestjs/common';

@Controller()
export class AppController {

   @Get('public/:imgId')
   publicAssets(@Param('imgId') imgId, @Res() res) {
   return res.sendFile(imgId, { root: 'public' });
   }
}
