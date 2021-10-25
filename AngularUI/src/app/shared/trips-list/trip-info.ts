export class TripInfo {
  constructor(
    public id: number = 0,
    public name: string = '',
    public author: string = '',
    public likes: number = 0,
    public favourites: number = 0,
    public costs: number = 0,
    public minutes: number = 0,
    public description: string = ''
  ) {}
}
