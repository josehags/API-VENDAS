import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

// pesquinsando pelo token
@EntityRepository(UserToken)
class UsersTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }
  // criando token
  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}
export default UsersTokensRepository;