export default (req, res, next) => {
    if (req.isAuthenticated && req.user.isAdmin) {
        return next();
    }
    res.status(403).json({ error: 'You must be an admin to view this' });
}

