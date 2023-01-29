import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/', leaderboardController.getLeaderboard);

router.get('/home', leaderboardController.getAllMatchesHome);

router.get('/away', leaderboardController.getAllMatchesAway);

export default router;
