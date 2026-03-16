import Topic from '../models/Topic';

interface CreateTopicDTO {
  label: string;
  color: string;
  userId: number;
}

class TopicService {
  public async findAll(userId: number) {
    return await Topic.findAll({ where: { userId } });
  }

  public async findById(id: number, userId: number) {
    const topic = await Topic.findOne({ where: { id, userId } });
    if (!topic) {
      const error = new Error('Tópico não encontrado');
      (error as any).status = 404;
      throw error;
    }
    return topic;
  }

  public async create(data: CreateTopicDTO) {
    return await Topic.create(data as any);
  }

  public async delete(id: number, userId: number) {
    const topic = await this.findById(id, userId);
    await topic.destroy();
  }
}

export default new TopicService();
