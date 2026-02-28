const express = require('express');
const router = express.Router();
const MemberController = require('../Controllers/member')
const auth = require('../Middleware/middleware')


router.get('/all-member',auth ,MemberController.getAllMember)
router.post('/register-member',auth,MemberController.registerMember);
router.get('/search-members',auth,MemberController.searchMember)
router.get('/monthly-member',auth,MemberController.monthlyMember)
router.get('/within-3-days-expiring',auth,MemberController.expiringWithin3Days)
router.get('/within-4-7-days-expiring',auth,MemberController.expiringWithin4to7Days)
router.get('/expired-member',auth,MemberController.expiredMember)
router.get('/inactive-member',auth,MemberController.inactiveMember)

router.get('/get-member/:id',auth,MemberController.getMemberDetail)
router.post('/change-status/:id',auth,MemberController.changeStatus)
router.put('/update-member-plan/:id',auth,MemberController.updateMemberPlan)
module.exports = router;