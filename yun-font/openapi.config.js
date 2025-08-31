
import {
  generateService
} from '@umijs/openapi'

generateService({
  requestLibPath: "import  request  from '@/utils/request'",
  schemaPath: 'http://localhost:8101/api/v3/api-docs/web',
  serversPath: './src',
})
