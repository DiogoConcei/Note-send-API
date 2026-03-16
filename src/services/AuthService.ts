import User from '../models/User';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../config/config';

const client = new OAuth2Client(config.googleClientId);
const JWT_SECRET = config.jwtSecret;

class AuthService {
  public async register(data: any) {
    const { email, password, name } = data;
    const userExists = await User.findOne({ where: { email } });
    
    if (userExists) {
      const error = new Error('Usuário já cadastrado com este e-mail');
      (error as any).status = 400;
      throw error;
    }

    const user = await User.create({ email, password, name });
    return this.generateToken(user);
  }

  public async login(data: any) {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      const error = new Error('E-mail ou senha inválidos');
      (error as any).status = 401;
      throw error;
    }

    return this.generateToken(user);
  }

  public async googleLogin(idToken: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: config.googleClientId,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new Error('Falha ao obter dados do Google');
      }

      let user = await User.findOne({ where: { email: payload.email } });

      if (!user) {
        // Cria usuário automaticamente se não existir
        user = await User.create({
          email: payload.email,
          name: payload.name || 'Usuário Google',
          googleId: payload.sub,
          password: null, // Sem senha para usuários Google
        });
      } else if (!user.googleId) {
        // Vincula conta Google se o usuário já existia via cadastro manual
        user.googleId = payload.sub;
        await user.save();
      }

      return this.generateToken(user);
    } catch (error) {
      const authError = new Error('Falha na autenticação com Google');
      (authError as any).status = 401;
      throw authError;
    }
  }

  private generateToken(user: User) {
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}

export default new AuthService();
