import IBaseController from "../interface/base.interface.controller";
import IBaseService from '../../services/interface/base.interface.service'

interface BaseController<T extends IBaseService<Object>> extends IBaseController {

}

export default BaseController;