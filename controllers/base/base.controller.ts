import IBaseController from "../interface/base.interface.controller";
import IBaseBusiness from '../../business/interface/base.interface.business'

interface BaseController<T extends IBaseBusiness<Object>> extends IBaseController {

}

export default BaseController;