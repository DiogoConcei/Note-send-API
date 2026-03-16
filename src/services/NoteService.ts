import Note from '../models/Note';
import Topic from '../models/Topic';
import DOMPurify from 'isomorphic-dompurify';

interface CreateNoteDTO {
  title: string;
  content: string;
  userId: number;
  topicId?: number;
}

class NoteService {
  public async findAll(userId: number) {
    return await Note.findAll({ 
      where: { userId },
      include: [{ model: Topic, as: 'topic' }]
    });
  }

  public async findById(id: number, userId: number) {
    const note = await Note.findOne({ where: { id, userId } });
    if (!note) {
      const error = new Error('Nota não encontrada');
      (error as any).status = 404;
      throw error;
    }
    return note;
  }

  public async create(data: CreateNoteDTO) {
    // Sanitização contra XSS
    const sanitizedContent = DOMPurify.sanitize(data.content);
    return await Note.create({
      ...data,
      content: sanitizedContent
    } as any);
  }

  public async update(id: number, userId: number, data: Partial<CreateNoteDTO>) {
    const note = await this.findById(id, userId);
    
    const updateData = { ...data };
    if (updateData.content) {
      updateData.content = DOMPurify.sanitize(updateData.content);
    }

    return await note.update(updateData);
  }

  public async delete(id: number, userId: number) {
    const note = await this.findById(id, userId);
    await note.destroy();
  }
}

export default new NoteService();
