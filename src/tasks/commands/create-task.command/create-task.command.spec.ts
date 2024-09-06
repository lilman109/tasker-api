import { CreateTaskCommand } from './create-task.command';

describe('CreateTaskCommand', () => {
  it('should be defined', () => {
    const title = 'title';
    expect(new CreateTaskCommand(title)).toBeDefined();
  });
});
