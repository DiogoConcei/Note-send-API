import Note from '../models/Note';

interface CreateNoteDTO {
  title: string;
  content: string;
}

class NoteService {
  public async findAll() {
    return await Note.findAll();
  }

  public async findById(id: number) {
    const note = await Note.findByPk(id);
    if (!note) {
      const error = new Error('Nota não encontrada');
      (error as any).status = 404;
      throw error;
    }
    return note;
  }

  public async create(data: CreateNoteDTO) {
    return await Note.create(data as any);
  }

  public async update(id: number, data: Partial<CreateNoteDTO>) {
    const note = await this.findById(id);
    return await note.update(data);
  }

  public async delete(id: number) {
    const note = await this.findById(id);
    await note.destroy();
  }
}

export default new NoteService();
