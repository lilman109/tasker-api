export class CreateTaskCommand {
  constructor(
    public readonly title: string,
    public readonly userId: number
  ) {}
}
