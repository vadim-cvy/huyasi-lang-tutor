import type { NavPrimaryItem } from '../abstract/NavPrimaryItem';
import type { INavPrimaryItemsService } from './nav-primary-items.service.interface';

export class NavPrimaryItemsServiceStub implements INavPrimaryItemsService {
  public items: NavPrimaryItem[] = [];
}
