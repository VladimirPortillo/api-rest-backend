import jwt from 'jsonwebtoken';

// Función para generar un token
export const generarJWT = (id: any,usuario:any): string => {
    const payload={id,usuario};
    return jwt.sign(payload, 'Est0d3b3d3serC0mplic4do2080', { expiresIn: '24h' });
}
