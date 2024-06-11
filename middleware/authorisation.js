import jwt from 'jsonwebtoken';
import TokenModel from '../model/Auth.Token.model.js';
import { BadRequestError } from '../errors/index.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')

        if (!token) {
            throw new BadRequestError('Authorization token is missing');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const tokenDocument = await TokenModel.findOne({ token: token });
        if (!tokenDocument) {
            throw new BadRequestError('Invalid token');
        }

        if (decoded.role !== 'admin') {
            throw new BadRequestError('Unauthorized access - Admin role required');
        }

        req.user = decoded;
        // console.log(decoded);
        next()
    } catch (error) {
        return next(error);
    }
};
export default authMiddleware;