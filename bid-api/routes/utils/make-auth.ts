export default (authMiddleware: any) => (req: any, res: any, next: any) => {
    const [username, password] = req.headers
        .authorization
        .split(" ")[1]
        .split("-");
    
    const args = {
        username: username,
        password: password,
    };
    authMiddleware(args)
        .then((data: any) => {
            req.user = data;
            next();
        })
        .catch((err: any) => {
            res.status(401).send({
                success: false,
                code: 401,
                error: {
                    description: err.message,
                },
            });
        });
};
