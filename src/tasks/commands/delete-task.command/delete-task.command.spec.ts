import { DeleteTaskCommand } from './delete-task.command';

describe('DeleteTaskCommand', () => {
  it('should be defined', () => {
    const id = 1;
    expect(new DeleteTaskCommand(id)).toBeDefined();
  });
});
