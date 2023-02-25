import IBaseController from "../interface/base.interface.controller";
import IBaseService from '../../services/interface/base.interface.service'

// TODO: replace any with matching genercic
interface BaseController<T extends IBaseService<any>> extends IBaseController {

}

export default BaseController;