import { Request, Response, Router } from 'express';
import userController from '../../controllers/user.controller';
import { tcMiddleware } from '../../utils/duplicateMethods';
import { auth } from '../../utils/passport';

const router: Router = Router();
const path = '/user';

router.get(`${path}/get`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, userController.getAllUser.bind(userController));
});
router.get(`${path}/getById`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, userController.getById.bind(userController));
});
router.post(`${path}/register`, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, userController.register.bind(userController));
});
router.post(`${path}/forgot`, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, userController.forgot.bind(userController));
});
router.post(`${path}/login`, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, userController.login.bind(userController));
});
router.post(`${path}/update`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, userController.update.bind(userController));
});
router.delete(`${path}/`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, userController.delete.bind(userController));
});

export default router;
