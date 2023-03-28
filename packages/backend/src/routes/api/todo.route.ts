import { Request, Response, Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { tcMiddleware } from '../../utils/duplicateMethods';
import { auth } from '../../utils/passport';

const router: Router = Router();
const path = '/todo';

router.post(`${path}/get`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, todoController.findAllByUserId.bind(todoController));
});
router.post(`${path}/getFiltered`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, todoController.getFiltered.bind(todoController));
});
router.get(`${path}/getPublic`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, todoController.findAllPublic.bind(todoController));
});
router.post(`${path}/getById`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, todoController.getById.bind(todoController));
});
router.post(`${path}/create`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, todoController.create.bind(todoController));
});
router.post(`${path}/update`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, todoController.update.bind(todoController));
});
router.post(`${path}/delete`, auth, (_req: Request, _res: Response) => {
	tcMiddleware(_req, _res, todoController.delete.bind(todoController));
});

export default router;
